/* Builds the summary PDF and the wallet card PDF from what is stored on the device. No DOM access. */
(function () {
  'use strict';
  var HTH = window.HTH, t = HTH.t;

  function has(s) { return !!(s && String(s).trim()); }
  function join(parts, sep) { return parts.filter(has).join(sep); }
  function names(ids, list) {
    return (ids || []).map(function (id) {
      var hit = (list || []).filter(function (x) { return x.id === id; })[0];
      return hit ? hit.name : null;
    }).filter(Boolean);
  }

  /* Plain-text view of the Passport, used by both PDFs. */
  function passportText(P) {
    var c = HTH.get('passport');
    return {
      diagnosis: join([names(P.lesions, c.lesions).join('; '), P.diagnosis], '\n'),
      surgeries: P.surgeriesNone ? t('ui.pdf.none') : HTH.rows(P.surgeries, 'what').map(function (r) {
        var extra = join([r.year, r.where], ', ');
        return r.what + (extra ? ' (' + extra + ')' : '');
      }).join('\n'),
      medicines: P.medicinesNone ? t('ui.pdf.none') : HTH.rows(P.medicines, 'name').map(function (r) {
        return join([join([r.name, r.dose], ' '), r.when, r.why], ', ');
      }).join('\n'),
      allergies: P.allergies || '',
      devices: join([names(P.devices, c.devices).join('; '), P.deviceDetails], '\n'),
      peds: join([P.pedsName, P.pedsClinic, P.pedsPhone], ', '),
      achd: join([P.achdName, P.achdClinic, P.achdPhone], ', '),
      emergency: HTH.rows(P.emergency, 'name').map(function (r) {
        return join([r.name + (has(r.relation) ? ' (' + r.relation + ')' : ''), r.phone], ', ');
      }).join('\n')
    };
  }

  /* opts: { passport: true|false, checkin: true|false } */
  HTH.buildSummary = function (state, opts) {
    var P = state.passport || {}, d = HTH.pdf.create(), blank = t('ui.pdf.blank');
    function row(labelKey, value, o) { d.kv(t('ui.pdf.' + labelKey), has(value) ? value : blank, o); }

    d.h1(t('ui.pdf.title'));
    d.p(t('ui.pdf.completed', { date: HTH.fmtDate(new Date()) }), { color: d.GRAY, after: 8 });
    row('name', P.name);
    row('dob', HTH.fmtDate(P.dob));
    d.gap(4);
    d.note(t('ui.pdf.notice'));

    if (opts.passport) {
      var x = passportText(P);
      d.h2(t('ui.pdf.passport'));
      ['diagnosis', 'surgeries', 'medicines', 'allergies', 'devices', 'peds', 'achd', 'emergency']
        .forEach(function (k) { row(k, x[k]); });
    }

    ['mood', 'worry'].forEach(function (kind) {
      var rec = HTH.latestCheckin(state, kind);
      if (!opts.checkin || !rec) return;
      var c = HTH.instrument(rec.instrument), band = HTH.scoreBand(rec.total, rec.instrument), sh = c.selfHarmItem;
      d.h2(c.title + ' (' + t('ui.pdf.screener') + ')');
      row('instrument', c.name);
      row('date', HTH.fmtDate(rec.date));
      row('total', t('ui.pdf.totalValue', { score: rec.total, max: c.maxScore }), { bold: true });
      row('range', band.label);
      if (sh) {
        var shAns = rec.answers[sh - 1];
        row('flag', t(shAns > 0 ? 'ui.pdf.flagYes' : 'ui.pdf.flagNo', { n: sh, answer: c.options[shAns].label }), { bold: shAns > 0 });
      }
      if (rec.difficulty != null) row('difficulty', c.difficulty.options[rec.difficulty]);
      d.gap(4);
      d.ensure(170); /* keep the answer list together on one page */
      d.p(t('ui.pdf.answers'), { bold: true, after: 2 });
      c.items.forEach(function (item, i) {
        var a = rec.answers[i];
        d.p((i + 1) + '. ' + item + ': ' + c.options[a].label + ' (' + a + ')', { size: 9, indent: 8, after: 1.5 });
      });
    });

    var ready = (state.ready || [])[(state.ready || []).length - 1];
    if (opts.ready && ready) {
      var n = HTH.readyCounts(ready);
      d.h2(t('ui.pdf.ready'));
      row('date', HTH.fmtDate(ready.date));
      row('readyResult', t('ui.pdf.readySummary', { yes: n.yes, learning: n.learning, notYet: n.notYet.length, total: n.total }));
      if (n.notYet.length) row('readyNotYet', n.notYet.map(function (it) { return it.text; }).join('\n'));
    }

    var L = state.learning;
    if (opts.learning && L) {
      var ticked = (HTH.get('learning.items') || []).filter(function (it) { return L.picked.indexOf(it.id) >= 0; });
      d.h2(t('ui.pdf.learning'));
      row('date', HTH.fmtDate(L.date));
      if (ticked.length) {
        row('concerns', ticked.map(function (it) { return it.text; }).join('\n'));
        d.p(t('ui.pdf.learningAsk', { n: ticked.length }), { bold: true });
      } else {
        d.p(t('ui.pdf.learningNone'));
      }
    }

    if (opts.progress) {
      var X = state.transfer || {}, xDone = X.done || {}, steps = HTH.get('transfer.steps') || [];
      var teamDone = (state.team && state.team.done) || {};
      d.h2(t('ui.pdf.progress'));
      row('transferSteps', t('ui.pdf.stepsDone', { done: HTH.doneCount(steps, xDone), total: steps.length }) + '\n' +
        steps.map(function (s) { return (xDone[s.id] ? '[x] ' : '[  ] ') + s.title; }).join('\n'));
      if (X.date) row('firstVisit', HTH.fmtDate(X.date));
      row('teamChecklists', HTH.teamRoles(state).map(function (r) {
        return r.name + ': ' + t('ui.pdf.stepsDone', { done: HTH.doneCount(r.checklist, teamDone), total: r.checklist.length });
      }).join('\n'));
    }

    d.h2(t('ui.pdf.questions'));
    var qs = (state.questions || []).filter(has);
    if (!qs.length) d.p(t('ui.pdf.noQuestions'), { color: d.GRAY });
    qs.forEach(function (q, i) { d.p((i + 1) + '. ' + q, { indent: 8 }); });

    return d.bytes(function (page, pages) {
      return t('ui.pdf.footer', { v: HTH.meta.version, page: page, pages: pages });
    });
  };

  /* A fold-in-half card the size of a bank card (3.375 x 2.125 inches per side). */
  HTH.buildWalletCard = function (state) {
    var P = state.passport || {}, x = passportText(P), d = HTH.pdf.create();
    var fit = HTH.pdf.fit, wrap = HTH.pdf.wrap, blank = t('ui.pdf.blank');
    var cw = 243, ch = 153, pad = 10, inner = cw - 2 * pad;

    d.h1(t('ui.pdf.card.title'));
    d.p(t('ui.pdf.card.cut'), { color: d.GRAY, after: 14 });
    var top = d.getY(), left = d.M, bottom = top - ch;

    d.rect(left, bottom, cw * 2, ch, { lineWidth: 0.8 });
    d.line(left + cw, bottom, left + cw, top, { dash: true, color: [0.5, 0.5, 0.5] });

    /* Draws label + up to maxLines of value; returns the next y. */
    function block(px, yy, label, value, maxLines) {
      d.textAt(px, yy, label.toUpperCase(), { size: 6, bold: true, color: d.GRAY });
      yy -= 9;
      var lines = wrap(has(value) ? String(value).replace(/\n/g, '; ') : blank, inner, 8);
      if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines);
        lines[maxLines - 1] = fit(lines[maxLines - 1] + ' ...', inner, 8);
      }
      lines.forEach(function (ln) { d.textAt(px, yy, ln, { size: 8 }); yy -= 9.5; });
      return yy - 3;
    }

    /* Front */
    var px = left + pad, yy = top - 16;
    d.textAt(px, yy, t('ui.pdf.card.title'), { size: 9, bold: true, color: d.BRAND });
    yy -= 15;
    d.textAt(px, yy, fit(has(P.name) ? P.name : blank, inner, 11, true), { size: 11, bold: true });
    yy -= 11;
    d.textAt(px, yy, fit(t('ui.pdf.dob') + ': ' + (HTH.fmtDate(P.dob) || blank), inner, 8), { size: 8 });
    yy -= 14;
    yy = block(px, yy, t('ui.pdf.diagnosis'), x.diagnosis, 3);
    yy = block(px, yy, t('ui.pdf.devices'), x.devices, 1);
    block(px, yy, t('ui.pdf.allergies'), x.allergies, 2);

    /* Back */
    px = left + cw + pad; yy = top - 16;
    wrap(t('ui.pdf.card.statement'), inner, 7.5, true).forEach(function (ln) {
      d.textAt(px, yy, ln, { size: 7.5, bold: true, color: d.BRAND }); yy -= 9.5;
    });
    yy -= 5;
    yy = block(px, yy, t('ui.pdf.card.meds'), x.medicines, 4);
    yy = block(px, yy, t('ui.pdf.card.cardiologist'), has(x.achd) ? x.achd : x.peds, 2);
    block(px, yy, t('ui.pdf.card.emergency'), x.emergency, 2);

    return d.bytes(null);
  };
  /* ---------- plain-text versions, used only when the patient chooses to email ----------
     Kept short on purpose: email apps cut off long pre-written messages. */
  HTH.learningText = function (state) {
    var L = state.learning, c = HTH.get('learning'), P = state.passport || {}, lines = [c.checkHeading];
    if (!L) return lines.join('\r\n');
    var ticked = c.items.filter(function (it) { return L.picked.indexOf(it.id) >= 0; });
    lines.push(t('ui.pdf.date') + ': ' + HTH.fmtDate(L.date));
    if (has(P.name)) lines.push(t('ui.pdf.name') + ': ' + P.name);
    if (has(P.dob)) lines.push(t('ui.pdf.dob') + ': ' + HTH.fmtDate(P.dob));
    lines.push('');
    if (ticked.length) {
      lines.push(t('ui.pdf.concerns') + ':');
      ticked.forEach(function (it) { lines.push('- ' + it.text); });
      lines.push('', t('ui.pdf.learningAsk', { n: ticked.length }));
    } else {
      lines.push(t('ui.pdf.learningNone'));
    }
    lines.push('', t('ui.pdf.notice'));
    return lines.join('\r\n');
  };

  HTH.summaryText = function (state, opts) {
    var P = state.passport || {}, lines = [t('ui.pdf.title'), t('ui.pdf.completed', { date: HTH.fmtDate(new Date()) })];
    function kv(key, value) { if (has(value)) lines.push(t('ui.pdf.' + key) + ': ' + String(value).replace(/\n/g, '; ')); }
    kv('name', P.name); kv('dob', HTH.fmtDate(P.dob));

    if (opts.passport) {
      var x = passportText(P);
      lines.push('', t('ui.pdf.passport').toUpperCase());
      ['diagnosis', 'surgeries', 'medicines', 'allergies', 'devices', 'peds', 'achd', 'emergency'].forEach(function (k) { kv(k, x[k]); });
    }
    if (opts.checkin) {
      ['mood', 'worry'].forEach(function (kind) {
        var rec = HTH.latestCheckin(state, kind);
        if (!rec) return;
        var c = HTH.instrument(rec.instrument), sh = c.selfHarmItem;
        lines.push('', (c.title + ' (' + c.short + ')').toUpperCase());
        lines.push(HTH.fmtDate(rec.date) + ': ' + t('ui.pdf.totalValue', { score: rec.total, max: c.maxScore }) + ', ' + HTH.scoreBand(rec.total, rec.instrument).label);
        if (sh && rec.answers[sh - 1] > 0) lines.push(t('ui.pdf.flagYes', { n: sh, answer: c.options[rec.answers[sh - 1]].label }));
      });
    }
    var ready = (state.ready || [])[(state.ready || []).length - 1];
    if (opts.ready && ready) {
      var n = HTH.readyCounts(ready);
      lines.push('', t('ui.pdf.ready').toUpperCase());
      lines.push(t('ui.pdf.readySummary', { yes: n.yes, learning: n.learning, notYet: n.notYet.length, total: n.total }));
    }
    var L = state.learning;
    if (opts.learning && L) {
      var ticked = (HTH.get('learning.items') || []).filter(function (it) { return L.picked.indexOf(it.id) >= 0; });
      lines.push('', t('ui.pdf.learning').toUpperCase());
      if (ticked.length) ticked.forEach(function (it) { lines.push('- ' + it.text); });
      else lines.push(t('ui.pdf.learningNone'));
    }
    if (opts.progress) {
      var X = state.transfer || {}, steps = HTH.get('transfer.steps') || [];
      lines.push('', t('ui.pdf.transferSteps') + ': ' + t('ui.pdf.stepsDone', { done: HTH.doneCount(steps, X.done || {}), total: steps.length }));
      if (X.date) kv('firstVisit', HTH.fmtDate(X.date));
    }
    var qs = (state.questions || []).filter(has);
    if (qs.length) {
      lines.push('', t('ui.pdf.questions').toUpperCase());
      qs.forEach(function (q, i) { lines.push((i + 1) + '. ' + q); });
    }
    lines.push('', t('ui.pdf.notice'));
    return lines.join('\r\n');
  };
})();
