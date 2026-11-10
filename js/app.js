/* Screens and navigation. All wording comes from the files in /content. */
(function () {
  'use strict';
  var HTH = window.HTH, t = HTH.t, KEY = 'hth.v1';
  var state, memoryOnly = false;

  /* ---------- storage (this device only) ---------- */
  function blank() {
    return {
      v: 1, lang: null, profile: null, passport: {}, checkins: [], questions: [], focusDone: {},
      ready: [], learning: null, team: { done: {}, hidden: {} }, transfer: { done: {}, date: '' }, read: {}
    };
  }
  function load() {
    try {
      localStorage.setItem(KEY + '.test', '1');
      localStorage.removeItem(KEY + '.test');
      var s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && s.v === 1) return Object.assign(blank(), s);
    } catch (e) { memoryOnly = true; }
    return blank();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { memoryOnly = true; }
  }
  function eraseAll() {
    if (!window.confirm(t('ui.erase.confirm'))) return;
    try { localStorage.removeItem(KEY); } catch (e) { /* nothing stored */ }
    var lang = state.lang;
    state = blank(); state.lang = lang;
    wz = { step: 0, role: null, age: '' }; ci = null; rd = null; ln = null;
    go('welcome');
  }

  /* ---------- tiny DOM helpers ---------- */
  function add(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
    el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }
  function h(tag, attrs) {
    var el = document.createElement(tag), k, v;
    for (k in (attrs || {})) {
      v = attrs[k];
      if (v == null || v === false) continue;
      if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'class') el.className = v;
      else if (k === 'value' || k === 'checked' || k === 'hidden' || k === 'disabled') el[k] = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function p(text, cls) { return h('p', { class: cls }, text); }
  function btn(label, onclick, cls, attrs) {
    return h('button', Object.assign({ type: 'button', class: 'btn ' + (cls || 'primary'), onclick: onclick }, attrs || {}), label);
  }
  function linkBtn(label, path, cls) { return h('a', { class: 'btn ' + (cls || 'primary'), href: '#/' + path }, label); }
  function page(title) {
    var el = h('div', { class: 'page', 'data-title': title }, h('h1', {}, title));
    for (var i = 1; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function card() {
    var el = h('section', { class: 'card' });
    for (var i = 0; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function errorBox() { return h('p', { class: 'error', role: 'alert', hidden: true }); }
  function showError(box, msg) { box.textContent = msg; box.hidden = false; }
  function radioGroup(name, legend, options, value, onpick, legendCls) {
    return h('fieldset', { class: 'choices' },
      h('legend', { class: legendCls }, legend),
      options.map(function (o) {
        return h('label', { class: 'choice' },
          h('input', { type: 'radio', name: name, value: String(o[0]), checked: String(value) === String(o[0]), onchange: function () { onpick(o[0]); } }),
          h('span', {}, o[1]));
      }));
  }
  function bullets(items) { return h('ul', { class: 'bullets' }, items.map(function (s) { return h('li', {}, s); })); }

  /* ---------- crisis resources (shown in several places) ---------- */
  function crisisPanel(urgent) {
    var c = HTH.get('checkin.crisis');
    return h('section', { class: 'crisis' + (urgent ? ' urgent' : ''), 'aria-label': c.alwaysTitle },
      h('h2', {}, urgent ? c.title : c.alwaysTitle),
      p(urgent ? c.lead : c.always),
      h('div', { class: 'crisis-links' }, c.items.map(function (it) {
        return h('a', { class: 'btn crisis-btn', href: it.href }, h('strong', {}, it.label), h('span', {}, it.detail));
      })),
      p(c.also));
  }

  /* ---------- welcome ---------- */
  var wz = { step: 0, role: null, age: '' };
  function langPicker() {
    if (HTH.languages.length < 2) return null;
    return h('div', { class: 'field' },
      h('label', { for: 'lang' }, t('ui.common.language')),
      h('select', { id: 'lang', onchange: function (e) { state.lang = e.target.value; save(); loadLang(state.lang).then(function () { render(); }); } },
        HTH.languages.map(function (l) { return h('option', { value: l.code, selected: l.code === HTH.lang }, l.name); })));
  }
  function viewWelcome() {
    var u = 'ui.welcome.', err = errorBox();
    if (wz.step === 0) {
      return page(t(u + 'title'), p(t(u + 'intro'), 'lead'), langPicker(),
        radioGroup('role', t(u + 'whoQ'), [['patient', t(u + 'whoPatient')], ['caregiver', t(u + 'whoCaregiver')]], wz.role, function (v) { wz.role = v; }),
        err,
        h('div', { class: 'actions' }, btn(t('ui.common.next'), function () {
          if (!wz.role) return showError(err, t(u + 'whoErr'));
          wz.step = 1; render();
        })));
    }
    if (wz.step === 1) {
      return page(t(u + (wz.role === 'caregiver' ? 'ageQCaregiver' : 'ageQPatient')),
        h('div', { class: 'field' },
          h('label', { for: 'age' }, t(u + (wz.role === 'caregiver' ? 'ageQCaregiver' : 'ageQPatient'))),
          p(t(u + 'ageHint'), 'hint'),
          h('input', { id: 'age', type: 'text', inputmode: 'numeric', autocomplete: 'off', maxlength: 3, class: 'short', value: wz.age, oninput: function (e) { wz.age = e.target.value; } })),
        err,
        h('div', { class: 'actions' },
          btn(t('ui.common.back'), function () { wz.step = 0; render(); }, 'ghost'),
          btn(t('ui.common.next'), function () {
            var n = parseInt(wz.age, 10);
            if (!/^\s*\d{1,3}\s*$/.test(wz.age) || n < 1 || n > 110) return showError(err, t(u + 'ageErr'));
            wz.step = 2; render();
          })));
    }
    return page(t(u + 'privacyTitle'), bullets(HTH.get('ui.welcome.privacy')),
      h('div', { class: 'actions' },
        btn(t('ui.common.back'), function () { wz.step = 1; render(); }, 'ghost'),
        btn(t(u + 'start'), function () {
          state.profile = { role: wz.role, age: parseInt(wz.age, 10), ageSetAt: HTH.isoDate(new Date()) };
          save(); go('home');
        })));
  }

  /* ---------- home dashboard ---------- */
  function viewHome() {
    var u = 'ui.home.', P = state.passport, age = HTH.ageNow(state), band = HTH.get('pathways.bands.' + HTH.bandFor(age));
    var caregiver = state.profile.role === 'caregiver';
    var done = HTH.partsDone(P), total = HTH.PARTS.length, last = HTH.latestCheckin(state);
    var first = (P.name || '').trim().split(/\s+/)[0];

    var pathway = card(
      p(t(u + 'pathway') + ' · ' + band.label, 'eyebrow'),
      h('h2', {}, band.title), p(band.intro),
      age < 12 ? p(HTH.get('pathways.young'), 'callout') : null,
      h('h3', {}, t(u + 'focusTitle')), p(t(u + 'focusHint'), 'hint'),
      h('div', { class: 'checks' }, band.focus.map(function (f) {
        return h('label', { class: 'choice' },
          h('input', { type: 'checkbox', checked: !!state.focusDone[f.id], onchange: function (e) { state.focusDone[f.id] = e.target.checked; save(); } }),
          h('span', {}, f.text));
      })),
      caregiver ? [h('h3', {}, t(u + 'caregiverTitle')), bullets(band.caregiver)] : null);

    var todos = [];
    if (done < total) todos.push([t(u + 'todoPassport', { done: done, total: total }), 'passport']);
    if (!state.ready.length) todos.push([t(u + 'todoReady'), 'ready']);
    if (!last && !caregiver) todos.push([t(u + 'todoCheckin'), 'checkin']);
    if (!state.questions.filter(Boolean).length) todos.push([t(u + 'todoQuestions'), 'share']);
    todos.push([t(u + 'todoShare'), 'share']);

    var lastReady = state.ready[state.ready.length - 1], rc = HTH.readyCounts(lastReady);
    var steps = HTH.get('transfer.steps'), stepsDone = HTH.doneCount(steps, state.transfer.done);
    var teamDone = 0, teamTotal = 0;
    HTH.teamRoles(state).forEach(function (r) { teamDone += HTH.doneCount(r.checklist, state.team.done); teamTotal += r.checklist.length; });
    function readStatus(key) {
      var topics = HTH.get(key + '.topics');
      return t(u + 'readStatus', { done: topics.filter(function (x) { return state.read[key + '.' + x.id]; }).length, total: topics.length });
    }

    function tile(title, status, path, progress) {
      return h('a', { class: 'tile', href: '#/' + path },
        h('strong', {}, title), h('span', { class: 'muted' }, status),
        progress ? h('progress', { value: progress[0], max: progress[1], 'aria-label': status }) : null);
    }

    return page(first && !caregiver ? t(u + 'titleName', { name: first }) : t(u + 'title'),
      pathway,
      card(h('h2', {}, t(u + 'todoTitle')),
        h('ul', { class: 'todo' }, todos.map(function (x) { return h('li', {}, h('a', { href: '#/' + x[1] }, x[0])); })),
        linkBtn(t(u + 'exportBtn'), 'share')),
      h('h2', { class: 'section-title' }, t(u + 'sectionsTitle')),
      h('div', { class: 'tiles' },
        tile(HTH.get('passport.title'), t(u + 'passportProgress', { done: done, total: total }), 'passport', [done, total]),
        tile(HTH.get('ready.title'), lastReady ? t('ready.result.lastDone', { date: HTH.fmtDate(lastReady.date), yes: rc.yes, total: rc.total }) : HTH.get('ready.result.never'), 'ready', lastReady ? [rc.yes, rc.total] : null),
        tile(HTH.get('checkin.intro.title'), last ? t(u + 'checkinLast', { date: HTH.fmtDate(last.date) }) : t(u + 'checkinNone'), 'checkin'),
        tile(HTH.get('learning.title'), state.learning ? t('learning.result.lastDone', { date: HTH.fmtDate(state.learning.date) }) : HTH.get('learning.result.never'), 'learning'),
        tile(HTH.get('team.title'), t('team.status', { done: teamDone, total: teamTotal }), 'team', [teamDone, teamTotal]),
        tile(HTH.get('transfer.title'), t('transfer.status', { done: stepsDone, total: steps.length }), 'transfer', [stepsDone, steps.length]),
        tile(HTH.get('money.title'), readStatus('money'), 'money'),
        tile(HTH.get('living.title'), readStatus('living'), 'living'),
        tile(t('ui.share.title'), t(u + 'shareDesc'), 'share')));
  }

  /* ---------- passport ---------- */
  function col(k, extra) { return Object.assign({ k: k }, extra || {}); }
  var FORMS = {
    about: [{ k: 'name', type: 'text', autocomplete: 'name' }, { k: 'dob', type: 'date', autocomplete: 'bday' }],
    heart: [{ k: 'lesions', type: 'checks', options: 'passport.lesions' }, { k: 'diagnosis', type: 'textarea' }],
    surgeries: [{ k: 'surgeries', type: 'list', noneKey: 'surgeriesNone', cols: [col('what'), col('year', { inputmode: 'numeric', short: true }), col('where')] }],
    medicines: [{ k: 'medicines', type: 'list', noneKey: 'medicinesNone', cols: [col('name'), col('dose'), col('when'), col('why')] }],
    allergies: [{ k: 'allergies', type: 'textarea' }],
    devices: [{ k: 'devices', type: 'checks', options: 'passport.devices' }, { k: 'deviceDetails', type: 'textarea' }],
    team: [{ k: 'pedsName', type: 'text' }, { k: 'pedsClinic', type: 'text' }, { k: 'pedsPhone', type: 'tel' },
      { k: 'achdName', type: 'text' }, { k: 'achdClinic', type: 'text' }, { k: 'achdPhone', type: 'tel' }],
    emergency: [{ k: 'emergency', type: 'list', cols: [col('name'), col('relation'), col('phone', { type: 'tel' })] }]
  };

  function field(def, obj) {
    var base = 'passport.fields.' + def.k, id = 'f-' + def.k, label = t(base + '.label'), hint = HTH.get(base + '.hint');

    if (def.type === 'checks') {
      var picked = obj[def.k] = obj[def.k] || [];
      return h('fieldset', { class: 'choices' }, h('legend', {}, label),
        HTH.get(def.options).map(function (o) {
          var explain = o.explain ? h('p', { class: 'explain', hidden: picked.indexOf(o.id) < 0 }, o.explain) : null;
          return h('div', {},
            h('label', { class: 'choice' },
              h('input', { type: 'checkbox', checked: picked.indexOf(o.id) >= 0, onchange: function (e) {
                var i = picked.indexOf(o.id);
                if (e.target.checked && i < 0) picked.push(o.id);
                if (!e.target.checked && i >= 0) picked.splice(i, 1);
                if (explain) explain.hidden = !e.target.checked;
                save();
              } }),
              h('span', {}, o.name)),
            explain);
        }));
    }

    if (def.type === 'list') {
      var rows = obj[def.k] = obj[def.k] || [];
      return h('div', { class: 'list' },
        rows.map(function (row, i) {
          return h('fieldset', { class: 'row' },
            h('legend', {}, t(base + '.item', { n: i + 1 })),
            def.cols.map(function (c) {
              var cid = def.k + '-' + i + '-' + c.k;
              return h('div', { class: 'field' },
                h('label', { for: cid }, t(base + '.cols.' + c.k)),
                h('input', { id: cid, type: c.type || 'text', inputmode: c.inputmode, class: c.short ? 'short' : null, autocomplete: 'off', value: row[c.k] || '', oninput: function (e) { row[c.k] = e.target.value; save(); } }));
            }),
            btn(t('ui.common.remove'), function () { rows.splice(i, 1); save(); render('#add-' + def.k); }, 'ghost small'));
        }),
        btn('+ ' + HTH.get('passport.addRow'), function () {
          rows.push({});
          if (def.noneKey) obj[def.noneKey] = false;
          save(); render('#' + def.k + '-' + (rows.length - 1) + '-' + def.cols[0].k);
        }, 'secondary', { id: 'add-' + def.k }),
        def.noneKey && !rows.length ? h('label', { class: 'choice' },
          h('input', { type: 'checkbox', checked: !!obj[def.noneKey], onchange: function (e) { obj[def.noneKey] = e.target.checked; save(); } }),
          h('span', {}, HTH.get('passport.noneLabel'))) : null);
    }

    var attrs = { id: id, autocomplete: def.autocomplete || 'off', 'aria-describedby': hint ? id + '-hint' : null, value: obj[def.k] || '', oninput: function (e) { obj[def.k] = e.target.value; save(); } };
    if (def.type !== 'textarea') attrs.type = def.type;
    else attrs.rows = 3;
    return h('div', { class: 'field' },
      h('label', { for: id }, label),
      hint ? h('p', { class: 'hint', id: id + '-hint' }, hint) : null,
      h(def.type === 'textarea' ? 'textarea' : 'input', attrs));
  }

  function viewPassport(args) {
    var c = HTH.get('passport'), P = state.passport, id = args[0];
    if (!FORMS[id]) {
      return page(c.title, p(c.intro, 'lead'),
        h('ol', { class: 'parts' }, HTH.PARTS.map(function (pid) {
          var ok = HTH.partDone(P, pid);
          return h('li', {}, h('a', { class: 'part', href: '#/passport/' + pid },
            h('span', {}, c.parts[pid].title),
            h('span', { class: 'status ' + (ok ? 'ok' : '') }, ok ? c.statusDone : c.statusTodo)));
        })),
        p(c.lifelong, 'callout'),
        linkBtn(t('ui.home.exportBtn'), 'share', 'secondary'));
    }
    var idx = HTH.PARTS.indexOf(id), next = HTH.PARTS[idx + 1];
    return page(c.parts[id].title,
      p(t('passport.partOf', { n: idx + 1, total: HTH.PARTS.length }), 'eyebrow'),
      p(c.parts[id].intro, 'lead'),
      FORMS[id].map(function (def) { return field(def, P); }),
      p(t('ui.common.saved'), 'hint'),
      h('div', { class: 'actions' },
        linkBtn(c.backToList, 'passport', 'ghost'),
        linkBtn(next ? c.nextPart : c.finish, next ? 'passport/' + next : 'passport')));
  }

  /* ---------- check-in (screener) ---------- */
  var ci = null;
  function viewCheckin() {
    var c = HTH.get('checkin'), err = errorBox();
    if (!ci) ci = { step: 'intro' };
    /* q = the screener in use: fixed when a check-in starts, so it cannot change part-way. */
    var q = HTH.instrument(ci.record ? ci.record.instrument : (ci.inst || HTH.instrumentFor(state)));

    if (ci.step === 'intro') {
      var hist = state.checkins.slice().reverse();
      return page(c.intro.title, p(c.intro.lead, 'lead'),
        state.profile.role === 'caregiver' ? p(c.intro.caregiver, 'callout') : null,
        bullets([c.intro.what, c.intro.notDiagnosis, c.intro.notWatched]),
        ['mood', 'worry'].map(function (kind) {
          var tool = HTH.instrument(HTH.instrumentFor(state, kind)), last = HTH.latestCheckin(state, kind);
          return card(h('h2', {}, tool.title), p(tool.about),
            p(last ? t('checkin.intro.last', { date: HTH.fmtDate(last.date), score: last.total, max: HTH.instrument(last.instrument).maxScore, label: HTH.scoreBand(last.total, last.instrument).label }) : c.intro.never, 'hint'),
            btn((last ? c.intro.again : c.intro.start) + ': ' + tool.title, function () {
              ci = { step: 'q', i: 0, answers: [], difficulty: null, crisisSeen: false, inst: tool.id };
              render();
            }, last ? 'secondary' : 'primary'));
        }),
        hist.length ? card(h('h2', {}, c.intro.history), h('ul', { class: 'bullets' }, hist.map(function (r) {
          var tool = HTH.instrument(r.instrument);
          return h('li', {}, t('checkin.intro.historyRow', { date: HTH.fmtDate(r.date), score: r.total, max: tool.maxScore, label: HTH.scoreBand(r.total, r.instrument).label, tool: tool.short }));
        }))) : null,
        crisisPanel(false));
    }

    if (ci.step === 'q') {
      var i = ci.i;
      return page(t('checkin.progress', { n: i + 1, total: q.items.length }),
        h('progress', { value: i, max: q.items.length, 'aria-hidden': 'true' }),
        p(q.stem, 'stem'),
        radioGroup('q' + i, q.items[i], q.options.map(function (o) { return [o.value, o.label]; }), ci.answers[i], function (v) { ci.answers[i] = v; }, 'question'),
        err,
        h('div', { class: 'actions' },
          btn(t('ui.common.back'), function () { if (i === 0) ci = { step: 'intro' }; else ci.i--; render(); }, 'ghost'),
          btn(t('ui.common.next'), function () {
            if (ci.answers[i] == null) return showError(err, c.pickOne);
            if (q.selfHarmItem && i === q.selfHarmItem - 1 && ci.answers[i] > 0 && !ci.crisisSeen) { ci.step = 'crisis'; return render(); }
            advance();
          })));
    }

    if (ci.step === 'crisis') {
      /* Shown at once on any answer above "Not at all" to the self-harm question, before anything else. */
      return page(c.crisis.title, crisisPanel(true), p(c.crisis.interstitialNote),
        h('div', { class: 'actions' }, btn(c.crisis.cont, function () { ci.crisisSeen = true; ci.step = 'q'; advance(); }, 'secondary')));
    }

    if (ci.step === 'difficulty') {
      return page(q.name,
        radioGroup('diff', q.difficulty.question, q.difficulty.options.map(function (o, k) { return [k, o]; }), ci.difficulty, function (v) { ci.difficulty = v; }, 'question'),
        err,
        h('div', { class: 'actions' },
          btn(t('ui.common.back'), function () { ci.step = 'q'; ci.i = q.items.length - 1; render(); }, 'ghost'),
          btn(t('ui.common.next'), function () {
            if (ci.difficulty == null) return showError(err, c.pickOne);
            finish();
          })));
    }

    /* result */
    var rec = ci.record, band = HTH.scoreBand(rec.total, rec.instrument);
    var urgent = (q.severeMin != null && rec.total >= q.severeMin) || (!!q.selfHarmItem && rec.answers[q.selfHarmItem - 1] > 0);
    return page(c.result.title,
      p(q.title, 'eyebrow'),
      urgent ? crisisPanel(true) : null,
      card(p(t('checkin.result.score', { score: rec.total, max: q.maxScore }), 'score'),
        p(t('checkin.result.range', { label: band.label })), p(band.text), p(c.result.notDiagnosis, 'hint')),
      card(h('h2', {}, c.result.shareTitle), p(c.result.share), linkBtn(c.result.toShare, 'share'), p(c.result.saved, 'hint')),
      urgent ? null : crisisPanel(false));

    function advance() {
      if (ci.i < q.items.length - 1) { ci.i++; ci.step = 'q'; return render(); }
      var any = ci.answers.some(function (a) { return a > 0; });
      if (any) { ci.step = 'difficulty'; return render(); }
      finish();
    }
    function finish() {
      var total = ci.answers.reduce(function (a, b) { return a + b; }, 0);
      ci.record = { instrument: q.id, date: HTH.isoDate(new Date()), answers: ci.answers.slice(), difficulty: ci.difficulty, total: total };
      state.checkins.push(ci.record); save();
      ci.step = 'result'; render();
    }
  }

  /* ---------- shared bits for the reading and checklist sections ---------- */
  function linkList(links) {
    return links && links.length ? h('ul', { class: 'sources' }, links.map(function (l) {
      return h('li', {}, h('a', { href: l.url, target: '_blank', rel: 'noopener noreferrer' }, l.label));
    })) : null;
  }
  /* In content files a paragraph is a string and a bullet list is an array. */
  function bodyBlocks(body) {
    return (body || []).map(function (b) { return Array.isArray(b) ? bullets(b) : p(b); });
  }
  /* Button that copies a suggested question into "My questions for my team". */
  function addQuestionBtn(text) {
    var have = state.questions.indexOf(text) >= 0;
    return btn(t(have ? 'ui.topics.added' : 'ui.topics.addQuestion'), function (e) {
      if (state.questions.indexOf(text) < 0) { state.questions.push(text); save(); }
      e.target.textContent = t('ui.topics.added'); e.target.disabled = true;
    }, 'ghost small', { disabled: have });
  }
  function tick(label, checked, onchange, sub) {
    return h('label', { class: 'choice' },
      h('input', { type: 'checkbox', checked: !!checked, onchange: function (e) { onchange(e.target.checked); } }),
      h('span', {}, sub ? [h('strong', {}, label), h('span', { class: 'sub' }, sub)] : label));
  }

  /* ---------- reading topics (Money, Living With My Heart) ---------- */
  function topicsView(key) {
    return function (args) {
      var c = HTH.get(key), band = HTH.bandFor(HTH.ageNow(state)), u = 'ui.topics.', idx = -1;
      c.topics.forEach(function (x, i) { if (x.id === args[0]) idx = i; });
      function isRead(x) { return !!state.read[key + '.' + x.id]; }

      if (idx < 0) {
        var now = c.topics.filter(function (x) { return !x.bands || x.bands.indexOf(band) >= 0; });
        var other = c.topics.filter(function (x) { return now.indexOf(x) < 0; });
        var list = function (arr) {
          return h('ul', { class: 'parts' }, arr.map(function (x) {
            return h('li', {}, h('a', { class: 'part', href: '#/' + key + '/' + x.id },
              h('span', {}, x.title), isRead(x) ? h('span', { class: 'status ok' }, t(u + 'read')) : null));
          }));
        };
        return page(c.title, p(c.lead, 'lead'),
          now.length ? [h('h2', { class: 'section-title' }, t(u + 'forNow')), list(now)] : null,
          other.length ? [h('h2', { class: 'section-title' }, t(u + 'other')), list(other)] : null,
          p(c.note, 'callout'));
      }

      var x = c.topics[idx], next = c.topics[idx + 1];
      return page(x.title, bodyBlocks(x.body),
        x.ask ? card(h('h2', {}, t(u + 'ask')), p(x.ask), addQuestionBtn(x.ask)) : null,
        linkList(x.links),
        tick(t(u + 'markRead'), isRead(x), function (v) { state.read[key + '.' + x.id] = v; save(); }),
        p(c.note, 'hint'),
        h('div', { class: 'actions' }, linkBtn(t(u + 'back'), key, 'ghost'),
          next ? linkBtn(t(u + 'next'), key + '/' + next.id) : linkBtn(t(u + 'done'), key)));
    };
  }

  /* ---------- Am I Ready? ---------- */
  var rd = null;
  function viewReady() {
    var c = HTH.get('ready'), r = 'ready.result.', last = state.ready[state.ready.length - 1], err = errorBox();
    if (!rd) rd = { step: 'intro' };

    if (rd.step === 'intro') {
      var lc = HTH.readyCounts(last);
      return page(c.title, p(c.lead, 'lead'), p(c.how), p(c.notScored, 'hint'),
        p(last ? t(r + 'lastDone', { date: HTH.fmtDate(last.date), yes: lc.yes, total: lc.total }) : c.result.never, 'callout'),
        h('div', { class: 'actions' }, btn(last ? c.again : c.start, function () {
          rd = { step: 0, answers: Object.assign({}, last ? last.answers : {}) };
          render();
        })));
    }

    if (typeof rd.step === 'number') {
      var g = c.groups[rd.step];
      return page(g.title, p(t('ready.partOf', { n: rd.step + 1, total: c.groups.length }), 'eyebrow'),
        g.items.map(function (it) {
          return h('fieldset', { class: 'seg' }, h('legend', {}, it.text),
            h('div', { class: 'seg-row' }, c.options.map(function (o) {
              return h('label', {},
                h('input', { type: 'radio', name: it.id, value: String(o.value), checked: rd.answers[it.id] === o.value, onchange: function () { rd.answers[it.id] = o.value; } }),
                h('span', {}, o.label));
            })));
        }),
        err,
        h('div', { class: 'actions' },
          btn(t('ui.common.back'), function () { if (rd.step === 0) rd = { step: 'intro' }; else rd.step--; render(); }, 'ghost'),
          btn(t('ui.common.next'), function () {
            if (g.items.some(function (it) { return rd.answers[it.id] == null; })) return showError(err, c.answerAll);
            if (rd.step < c.groups.length - 1) { rd.step++; return render(); }
            rd.prev = last || null;
            rd.record = { date: HTH.isoDate(new Date()), answers: rd.answers };
            state.ready.push(rd.record); save();
            rd.step = 'result'; render();
          })));
    }

    var n = HTH.readyCounts(rd.record), prevYes = rd.prev ? HTH.readyCounts(rd.prev).yes : null;
    return page(c.result.title,
      card(p(t(r + 'summary', { yes: n.yes, total: n.total }), 'score'),
        n.learning ? p(t(r + 'learning', { n: n.learning })) : null,
        prevYes == null ? null : p(n.yes > prevYes ? t(r + 'better', { n: n.yes - prevYes }) : t(r + 'same', { n: prevYes })),
        p(t(r + 'saved', { date: HTH.fmtDate(rd.record.date) }), 'hint')),
      n.notYet.length ? card(h('h2', {}, c.result.nextTitle), p(c.result.nextIntro, 'hint'), bullets(n.notYet.map(function (i) { return i.text; }))) : null,
      n.yes === n.total ? p(c.result.allYes, 'callout') : null,
      h('div', { class: 'actions' }, linkBtn(c.result.toShare, 'share')));
  }

  /* ---------- Learning, Attention, and Memory ---------- */
  var ln = null;
  function viewLearning() {
    var c = HTH.get('learning'), r = c.result;
    if (!ln) ln = { step: state.learning ? 'result' : 'form', picked: state.learning ? state.learning.picked.slice() : [] };
    var support = [card(h('h2', {}, c.supportTitle), bullets(c.support)), card(h('h2', {}, c.linksTitle), linkList(c.links))];

    if (ln.step === 'form') {
      return page(c.title, p(c.lead, 'lead'),
        card(h('h2', {}, c.whyTitle), c.why.map(function (s) { return p(s); })),
        h('fieldset', { class: 'choices' }, h('legend', {}, c.question), p(c.hint, 'hint'),
          c.items.map(function (it) {
            return tick(it.text, ln.picked.indexOf(it.id) >= 0, function (v) {
              var i = ln.picked.indexOf(it.id);
              if (v && i < 0) ln.picked.push(it.id);
              if (!v && i >= 0) ln.picked.splice(i, 1);
            });
          })),
        h('div', { class: 'actions' }, btn(c.see, function () {
          state.learning = { date: HTH.isoDate(new Date()), picked: ln.picked.slice() }; save();
          ln.step = 'result'; render();
        })),
        support);
    }

    var saved = state.learning, n = saved.picked.length;
    return page(r.title,
      card(n ? [p(t('learning.result.someLead', { n: n }), 'score'),
        bullets(c.items.filter(function (it) { return saved.picked.indexOf(it.id) >= 0; }).map(function (it) { return it.text; })),
        p(r.some), addQuestionBtn(r.ask)] : p(r.none),
        p(r.notDiagnosis, 'hint'), p(t('learning.result.saved', { date: HTH.fmtDate(saved.date) }), 'hint')),
      n ? card(h('h2', {}, r.evalTitle), p(r.eval)) : null,
      h('div', { class: 'actions' }, btn(c.change, function () { ln.step = 'form'; render(); }, 'ghost'), linkBtn(r.toShare, 'share')),
      support);
  }

  /* ---------- My Team ---------- */
  function viewTeam(args) {
    var c = HTH.get('team'), T = state.team;
    var role = c.roles.filter(function (x) { return x.id === args[0]; })[0];

    if (!role) {
      var hidden = c.roles.filter(function (x) { return T.hidden[x.id]; });
      return page(c.title, p(c.lead, 'lead'),
        h('ul', { class: 'parts' }, HTH.teamRoles(state).map(function (x) {
          var d = HTH.doneCount(x.checklist, T.done);
          return h('li', {}, h('a', { class: 'part', href: '#/team/' + x.id }, h('span', {}, x.name),
            h('span', { class: 'status ' + (d === x.checklist.length ? 'ok' : '') }, t('team.status', { done: d, total: x.checklist.length }))));
        })),
        hidden.length ? card(h('h2', {}, c.hiddenTitle), h('div', { class: 'actions' }, hidden.map(function (x) {
          return btn(t('team.show', { name: x.name }), function () { T.hidden[x.id] = false; save(); render(); }, 'ghost small');
        }))) : null);
    }

    return page(role.name, p(role.what, 'lead'),
      card(h('h2', {}, c.askTitle), h('ul', { class: 'asks' }, role.ask.map(function (q) {
        return h('li', {}, h('span', {}, q), addQuestionBtn(q));
      }))),
      card(h('h2', {}, c.checkTitle), role.checklist.map(function (it) {
        return tick(it.text, T.done[it.id], function (v) { T.done[it.id] = v; save(); });
      })),
      role.optional ? btn(c.hide, function () { T.hidden[role.id] = true; save(); go('team'); }, 'link') : null,
      h('div', { class: 'actions' }, linkBtn(c.back, 'team', 'ghost')));
  }

  /* ---------- The Transfer ---------- */
  function viewTransfer() {
    var c = HTH.get('transfer'), X = state.transfer;
    var bar = h('progress', { max: c.steps.length, value: 0 }), status = p('', 'hint');
    function update() {
      var d = HTH.doneCount(c.steps, X.done);
      bar.value = d; status.textContent = t('transfer.status', { done: d, total: c.steps.length });
    }
    update();
    return page(c.title, p(c.lead, 'lead'),
      card(h('h2', {}, c.stepsTitle), bar, status,
        c.steps.map(function (s) {
          return tick(s.title, X.done[s.id], function (v) { X.done[s.id] = v; save(); update(); }, s.text);
        }),
        h('div', { class: 'field' },
          h('label', { for: 'first-visit' }, c.dateLabel), p(c.dateHint, 'hint'),
          h('input', { id: 'first-visit', type: 'date', value: X.date || '', oninput: function (e) { X.date = e.target.value; save(); } }))),
      card(h('h2', {}, c.findTitle), c.find.map(function (s) { return p(s); }), linkList(c.findLinks)),
      card(h('h2', {}, c.firstTitle), bullets(c.first)),
      card(h('h2', {}, c.bringTitle), bullets(c.bring), linkBtn(t('ui.home.exportBtn'), 'share', 'secondary')));
  }

  /* ---------- summary / export ---------- */
  var inc = { passport: true, checkin: true, ready: true, learning: true, progress: true };
  function fileOf(bytes, name) { return new File([bytes], name, { type: 'application/pdf' }); }
  function download(bytes, name) {
    var url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    var a = h('a', { href: url, download: name });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
  }
  function viewShare() {
    var u = 'ui.share.', qs = state.questions, last = HTH.latestCheckin(state), status = h('p', { class: 'hint', role: 'status' });
    var name = 'heart-summary-' + HTH.isoDate(new Date()) + '.pdf';
    function summary() { return HTH.buildSummary(state, inc); }
    /* [key, label, is there anything to include yet] */
    var parts = [
      ['passport', t(u + 'incPassport'), true],
      ['checkin', last ? t(u + 'incCheckin') : t(u + 'incCheckinNone'), !!last],
      ['ready', t(u + 'incReady'), state.ready.length > 0],
      ['learning', t(u + 'incLearning'), !!state.learning],
      ['progress', t(u + 'incProgress'), true]
    ];
    var canShare = false;
    try { canShare = !!(navigator.canShare && navigator.canShare({ files: [fileOf(new Uint8Array(1), name)] })); } catch (e) { canShare = false; }

    return page(t(u + 'title'), p(t(u + 'intro'), 'lead'),
      card(h('h2', {}, t(u + 'questionsTitle')), p(t(u + 'questionsHint'), 'hint'),
        qs.map(function (q, i) {
          return h('div', { class: 'field qrow' },
            h('label', { for: 'q-' + i }, t(u + 'questionLabel', { n: i + 1 })),
            h('div', { class: 'inline' },
              h('input', { id: 'q-' + i, type: 'text', autocomplete: 'off', value: q, oninput: function (e) { qs[i] = e.target.value; save(); } }),
              btn(t('ui.common.remove'), function () { qs.splice(i, 1); save(); render('#add-q'); }, 'ghost small')));
        }),
        btn('+ ' + t(u + 'addQuestion'), function () { qs.push(''); save(); render('#q-' + (qs.length - 1)); }, 'secondary', { id: 'add-q' })),
      card(h('h2', {}, t(u + 'includeTitle')),
        parts.map(function (x) {
          return h('label', { class: 'choice' },
            h('input', { type: 'checkbox', checked: inc[x[0]] && x[2], disabled: !x[2], onchange: function (e) { inc[x[0]] = e.target.checked; } }),
            h('span', {}, x[1]));
        }),
        p(t(u + 'privateNote'), 'hint'),
        h('div', { class: 'actions stack' },
          btn(t(u + 'download'), function () { download(summary(), name); status.textContent = t(u + 'made'); }),
          canShare ? btn(t(u + 'share'), function () {
            navigator.share({ files: [fileOf(summary(), name)], title: t(u + 'fileTitle') }).catch(function () { /* cancelled */ });
          }, 'secondary') : null),
        status,
        p(t(u + 'portalNote'), 'callout')),
      card(h('h2', {}, t(u + 'walletTitle')), p(t(u + 'walletHint')),
        btn(t(u + 'wallet'), function () { download(HTH.buildWalletCard(state), 'heart-wallet-card.pdf'); status.textContent = t(u + 'made'); }, 'secondary')));
  }

  /* ---------- about, help ---------- */
  function viewAbout() {
    var u = 'ui.about.';
    return page(t(u + 'title'),
      card(h('h2', {}, t(u + 'whatTitle')), p(t(u + 'what'))),
      card(h('h2', {}, t(u + 'privacyTitle')), bullets(HTH.get('ui.about.privacy'))),
      card(h('h2', {}, t(u + 'eraseTitle')), p(t(u + 'eraseText')), btn(t('ui.footer.erase'), eraseAll, 'danger')),
      langPicker() ? card(langPicker()) : null,
      card(h('h2', {}, t(u + 'sourcesTitle')), p(t(u + 'sourcesNote'), 'hint'),
        h('ul', { class: 'sources' }, HTH.get('sources').map(function (s) {
          return h('li', {}, h('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer' }, s.title), h('span', { class: 'muted' }, s.by));
        }))));
  }
  function viewHelp() { return page(t('ui.help.title'), crisisPanel(true)); }

  /* ---------- shell and router ---------- */
  var VIEWS = {
    welcome: viewWelcome, home: viewHome, passport: viewPassport, checkin: viewCheckin, share: viewShare, about: viewAbout, help: viewHelp,
    ready: viewReady, learning: viewLearning, team: viewTeam, transfer: viewTransfer,
    money: topicsView('money'), living: topicsView('living')
  };

  function go(path) {
    if (location.hash === '#/' + path) render(); else location.hash = '#/' + path;
  }
  function render(focusSel) {
    var route = (location.hash.replace(/^#\/?/, '') || 'home').split('/');
    if (!state.profile && route[0] !== 'about' && route[0] !== 'help') route = ['welcome'];
    if (!VIEWS[route[0]]) route = ['home'];
    var view = VIEWS[route[0]](route.slice(1));
    var m = HTH.meta, app = document.getElementById('app');

    var tabs = state.profile ? h('nav', { class: 'tabs', 'aria-label': t('ui.appName') },
      ['home', 'passport', 'checkin', 'share'].map(function (id) {
        return h('a', { href: '#/' + id, 'aria-current': route[0] === id ? 'page' : null }, t('ui.nav.' + id));
      })) : null;

    app.textContent = '';
    add(app, [
      h('a', { class: 'skip', href: '#main', onclick: function (e) { e.preventDefault(); var mEl = document.getElementById('main'); mEl.focus(); } }, t('ui.skip')),
      m.lastClinicalReview ? null : h('p', { class: 'draft-banner' }, t('ui.draftBanner')),
      h('header', { class: 'top' }, h('div', { class: 'wrap' },
        h('a', { class: 'brand', href: '#/home' }, t('ui.appName')),
        h('a', { class: 'help-btn', href: '#/help' }, t('ui.helpNow')))),
      tabs,
      h('main', { id: 'main', tabindex: '-1' }, h('div', { class: 'wrap' },
        memoryOnly ? p(t('ui.memoryOnly'), 'callout warn') : null, view)),
      h('footer', { class: 'foot' }, h('div', { class: 'wrap' },
        p(t('ui.footer.disclaimer')),
        p(t('ui.footer.version', { v: m.version }) + ' · ' + (m.lastClinicalReview ? t('ui.footer.reviewed', { date: HTH.fmtDate(m.lastClinicalReview) }) : t('ui.footer.notReviewed'))),
        h('div', { class: 'foot-actions' },
          h('a', { href: '#/about' }, t('ui.footer.about')),
          btn(t('ui.footer.erase'), eraseAll, 'link'))))
    ]);

    document.title = view.getAttribute('data-title') + ' – ' + t('ui.appName');
    var target = focusSel ? app.querySelector(focusSel) : app.querySelector('h1');
    if (target) {
      if (!focusSel) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: !!focusSel });
    }
    if (!focusSel) window.scrollTo(0, 0);
  }

  /* ---------- language loading and start ---------- */
  function loadLang(code) {
    var L = HTH.languages.filter(function (l) { return l.code === code; })[0] || HTH.languages[0];
    HTH.lang = L.code;
    document.documentElement.lang = L.code;
    var bucket = HTH.content[L.code] = HTH.content[L.code] || {};
    if (bucket._loaded) return Promise.resolve();
    return L.files.reduce(function (chain, f) {
      return chain.then(function () {
        return new Promise(function (res, rej) {
          var s = document.createElement('script');
          s.src = 'content/' + L.code + '/' + f + '.js';
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      });
    }, Promise.resolve()).then(function () { bucket._loaded = true; });
  }

  state = load();
  var wanted = state.lang || (navigator.language || 'en').slice(0, 2);
  loadLang(wanted).then(function () {
    window.addEventListener('hashchange', function () {
      if (ci && ci.step === 'result') ci = null; /* leaving the result page ends that check-in */
      if (rd && rd.step === 'result') rd = null;
      ln = null;
      render();
    });
    render();
  });

  /* Offline use after the first visit. */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(function () { /* offline support is optional */ });
  }
})();
