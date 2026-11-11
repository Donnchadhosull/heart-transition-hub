/* Pages, navigation and optional tools. All wording comes from the files in /content. */
(function () {
  'use strict';
  var HTH = window.HTH, t = HTH.t, KEY = 'hth.v1';
  var state, memoryOnly = false;

  /* ---------- storage (this device only) ---------- */
  function blank() {
    return {
      v: 1, lang: null, profile: null, passport: {}, checkins: [], questions: [],
      ready: [], learning: null, team: { done: {}, hidden: {} }, transfer: { done: {}, date: '' }
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
    ci = null; rd = null; ln = null;
    go('');
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
  /* A normal reading page. Extra arguments become its content. */
  function page(title) {
    var el = h('div', { class: 'page', 'data-title': title }, h('h1', {}, title));
    for (var i = 1; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  /* A full-width page (home and overview pages). */
  function widePage(title) {
    var el = page.apply(null, arguments);
    el.className = 'page wide';
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
  function askList(questions) {
    return h('ul', { class: 'asks' }, questions.map(function (q) { return h('li', {}, h('span', {}, q), addQuestionBtn(q)); }));
  }
  function tick(label, checked, onchange, sub) {
    return h('label', { class: 'choice' },
      h('input', { type: 'checkbox', checked: !!checked, onchange: function (e) { onchange(e.target.checked); } }),
      h('span', {}, sub ? [h('strong', {}, label), h('span', { class: 'sub' }, sub)] : label));
  }
  /* Opens the person's own email app with a message already written. Nothing is sent by this site. */
  function emailBtn(label, subject, bodyFn, cls) {
    return btn([icon('mail', 'sm'), label], function () {
      location.href = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyFn());
    }, cls || 'secondary');
  }

  /* ---------- icons (simple line drawings) ---------- */
  var ICONS = {
    heart: ['M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z'],
    users: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
    shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
    activity: ['M22 12h-4l-3 9L9 3l-3 9H2'],
    navigation: ['M3 11l19-9-9 19-2-8-8-2z'],
    smile: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
    layers: ['M12 2 2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
    calendar: ['M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
    file: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8'],
    check: ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4 12 14.01l-3-3'],
    mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 6l-10 7L2 6'],
    clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z'],
    grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
    lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
    chevron: ['M6 9l6 6 6-6'],
    arrow: ['M5 12h14', 'M12 5l7 7-7 7'],
    menu: ['M3 12h18', 'M3 6h18', 'M3 18h18']
  };
  function icon(name, cls) {
    var NS = 'http://www.w3.org/2000/svg', s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('class', 'icon ' + (cls || ''));
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
    (ICONS[name] || []).forEach(function (d) {
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', d);
      s.appendChild(path);
    });
    return s;
  }

  /* ---------- site map ---------- */
  /* [page route, icon]. Titles and descriptions come from ui.sections and ui.toolItems. */
  var PATIENT = [['transition', 'calendar'], ['heart', 'heart'], ['living', 'activity'], ['wellbeing', 'smile'],
    ['learning', 'layers'], ['money', 'shield'], ['transfer', 'navigation'], ['team', 'users']];
  var TOOLS = [['passport', 'file', 'passport'], ['ready', 'check', 'ready'], ['checkin', 'smile', 'checkin'],
    ['learning/check', 'layers', 'learncheck'], ['share', 'mail', 'share']];
  var PARENT = { passport: 'tools', ready: 'tools', checkin: 'tools', share: 'tools' };
  PATIENT.forEach(function (x) { PARENT[x[0]] = 'patients'; });

  function sectionCard(route, ic, title, desc) {
    return h('a', { class: 'scard', href: '#/' + route },
      h('span', { class: 'scard-icon' }, icon(ic)),
      h('span', { class: 'scard-body' }, h('strong', {}, title), h('span', {}, desc)),
      icon('arrow', 'sm go'));
  }
  function patientGrid() {
    return h('div', { class: 'grid' }, PATIENT.map(function (x) {
      return sectionCard(x[0], x[1], t('ui.sections.' + x[0] + '.title'), t('ui.sections.' + x[0] + '.desc'));
    }));
  }
  function toolGrid() {
    return h('div', { class: 'grid' }, TOOLS.map(function (x) {
      return sectionCard(x[0], x[1], t('ui.toolItems.' + x[2] + '.title'), t('ui.toolItems.' + x[2] + '.desc'));
    }));
  }
  function privacyNote() { return h('p', { class: 'privacy-note' }, icon('lock', 'sm'), h('span', {}, t('ui.home.privacy'))); }

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

  /* ---------- home and overview pages ---------- */
  function viewHome() {
    var u = 'ui.home.', bands = HTH.get('pathways.bands'), pro = HTH.get('pro');
    var el = h('div', { class: 'page wide home', 'data-title': t('ui.tagline') },
      h('section', { class: 'hero' },
        h('div', { class: 'hero-text' },
          p(t(u + 'eyebrow'), 'eyebrow'),
          h('h1', {}, t(u + 'title')),
          p(t(u + 'lead'), 'lead'),
          h('div', { class: 'actions' }, linkBtn(t(u + 'ctaPatient'), 'patients'), linkBtn(t(u + 'ctaPro'), 'pro', 'outline'))),
        h('aside', { class: 'hero-panel' },
          h('h2', {}, t(u + 'glanceTitle')),
          h('ol', { class: 'stages' }, ['a', 'b', 'c', 'd'].map(function (k) {
            return h('li', {}, h('span', { class: 'stage-age' }, bands[k].label), h('span', { class: 'stage-name' }, bands[k].title));
          })),
          h('a', { class: 'more', href: '#/transition' }, t(u + 'glanceLink'), icon('arrow', 'sm')))),
      h('section', { class: 'block' },
        h('h2', {}, t(u + 'patientsTitle')), p(t(u + 'patientsLead'), 'block-lead'), patientGrid()),
      h('section', { class: 'block band' },
        h('h2', {}, t(u + 'proTitle')), p(t(u + 'proLead'), 'block-lead'),
        h('div', { class: 'chips' }, pro.roles.map(function (r) { return h('a', { class: 'chip', href: '#/pro/' + r.id }, r.name); })),
        h('div', { class: 'actions' }, linkBtn(t(u + 'proAll'), 'pro'), linkBtn(t('ui.nav.proShare'), 'pro/share', 'outline'))),
      h('section', { class: 'block' },
        h('h2', {}, t(u + 'toolsTitle')), p(t(u + 'toolsLead'), 'block-lead'), toolGrid(), privacyNote()));
    return el;
  }
  function viewPatients() {
    var u = 'ui.patients.';
    return widePage(t(u + 'title'), p(t(u + 'lead'), 'lead'), patientGrid(),
      h('h2', { class: 'section-title' }, t(u + 'toolsTitle')), p(t(u + 'toolsLead'), 'block-lead'), toolGrid(), privacyNote());
  }
  function viewTools() {
    var u = 'ui.tools.';
    return widePage(t(u + 'title'), p(t(u + 'lead'), 'lead'), toolGrid(),
      h('div', { class: 'narrow' },
        card(h('h2', {}, t(u + 'privacyTitle')), bullets(HTH.get('ui.tools.privacy')), btn(t('ui.footer.erase'), eraseAll, 'danger small'))));
  }

  /* ---------- Understanding transition ---------- */
  function viewTransition() {
    var c = HTH.get('pathways');
    return page(c.title, p(c.lead, 'lead'),
      h('h2', {}, c.whatTitle), c.what.map(function (s) { return p(s); }),
      card(h('h2', {}, c.vsTitle), bullets(c.vs)),
      h('h2', { class: 'section-title' }, c.stagesTitle), p(c.stagesNote, 'hint'),
      ['a', 'b', 'c', 'd'].map(function (k) {
        var b = c.bands[k];
        return card(p(b.label, 'eyebrow'), h('h3', {}, b.title), p(b.intro),
          h('h4', {}, c.focusTitle), bullets(b.focus.map(function (f) { return f.text; })),
          h('h4', {}, c.caregiverTitle), bullets(b.caregiver));
      }),
      h('div', { class: 'actions' }, linkBtn(t('ui.toolItems.ready.title'), 'ready', 'secondary'), linkBtn(t('ui.sections.transfer.title'), 'transfer', 'outline')));
  }

  /* ---------- Heart conditions explained ---------- */
  function viewHeart() {
    var c = HTH.get('passport'), x = c.conditions;
    return page(x.title, p(x.lead, 'lead'),
      h('div', { class: 'accordion' }, c.lesions.filter(function (l) { return l.id !== 'unsure'; }).map(function (l) {
        return h('details', {}, h('summary', {}, l.name), p(l.explain));
      })),
      p(c.lifelong, 'callout'), p(x.note, 'hint'),
      card(h('h2', {}, x.askTitle), askList(x.ask)),
      h('div', { class: 'actions' }, linkBtn(x.passport, 'passport/heart', 'secondary')));
  }

  /* ---------- reading topics (Living, Insurance) ---------- */
  function topicsView(key) {
    return function (args) {
      var c = HTH.get(key), u = 'ui.topics.', idx = -1;
      c.topics.forEach(function (x, i) { if (x.id === args[0]) idx = i; });
      if (idx < 0) {
        return page(t('ui.sections.' + key + '.title'), p(c.lead, 'lead'),
          h('ul', { class: 'parts' }, c.topics.map(function (x) {
            return h('li', {}, h('a', { class: 'part', href: '#/' + key + '/' + x.id }, h('span', {}, x.title), icon('arrow', 'sm go')));
          })),
          p(c.note, 'callout'));
      }
      var x = c.topics[idx], next = c.topics[idx + 1];
      return page(x.title, bodyBlocks(x.body),
        x.ask ? card(h('h2', {}, t(u + 'ask')), askList([x.ask])) : null,
        linkList(x.links),
        p(c.note, 'hint'),
        h('div', { class: 'actions' }, linkBtn(t(u + 'back'), key, 'ghost'),
          next ? linkBtn(t(u + 'next'), key + '/' + next.id) : linkBtn(t(u + 'done'), key)));
    };
  }

  /* ---------- Mood and wellbeing ---------- */
  function viewWellbeing() {
    var c = HTH.get('wellbeing');
    return page(c.title, p(c.lead, 'lead'),
      c.sections.map(function (s) { return [h('h2', {}, s.title), bodyBlocks(s.body)]; }),
      card(h('h2', {}, t('ui.topics.ask')), askList([c.ask])),
      card(h('h2', {}, c.checkTitle), p(c.checkLead), linkBtn(c.checkBtn, 'checkin', 'secondary')),
      crisisPanel(false));
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
        def.noneKey && !rows.length ? tick(HTH.get('passport.noneLabel'), obj[def.noneKey], function (v) { obj[def.noneKey] = v; save(); }) : null);
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
        h('div', { class: 'actions' }, linkBtn(t('ui.toolItems.share.title'), 'share', 'secondary')));
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

  /* ---------- check-ins (screeners) ---------- */
  var ci = null;
  function viewCheckin() {
    var c = HTH.get('checkin'), err = errorBox();
    if (!ci) ci = { step: 'intro' };
    /* q = the screener in use: fixed when a check-in starts, so it cannot change part-way. */
    var q = HTH.instrument(ci.record ? ci.record.instrument : (ci.inst || 'phq9'));
    function begin(id) { ci = { step: 'q', i: 0, answers: [], difficulty: null, crisisSeen: false, inst: id }; render(); }

    if (ci.step === 'intro') {
      var hist = state.checkins.slice().reverse();
      return page(c.intro.title, p(c.intro.lead, 'lead'),
        bullets([c.intro.what, c.intro.notDiagnosis, c.intro.notWatched, c.intro.caregiver]),
        ['mood', 'worry'].map(function (kind) {
          var tool = HTH.instrument(HTH.instrumentFor(state, kind)), last = HTH.latestCheckin(state, kind);
          return card(h('h2', {}, tool.title), p(tool.about),
            p(last ? t('checkin.intro.last', { date: HTH.fmtDate(last.date), score: last.total, max: HTH.instrument(last.instrument).maxScore, label: HTH.scoreBand(last.total, last.instrument).label }) : c.intro.never, 'hint'),
            btn((last ? c.intro.again : c.intro.start) + ': ' + tool.title, function () {
              /* The mood check-in has an under-18 version. Ask only if the Passport has no date of birth. */
              if (kind === 'mood' && HTH.ageNow(state) == null) { ci = { step: 'age', under: null }; render(); }
              else begin(tool.id);
            }, last ? 'secondary' : 'primary'));
        }),
        hist.length ? card(h('h2', {}, c.intro.history), h('ul', { class: 'bullets' }, hist.map(function (r) {
          var tool = HTH.instrument(r.instrument);
          return h('li', {}, t('checkin.intro.historyRow', { date: HTH.fmtDate(r.date), score: r.total, max: tool.maxScore, label: HTH.scoreBand(r.total, r.instrument).label, tool: tool.short }));
        }))) : null,
        crisisPanel(false));
    }

    if (ci.step === 'age') {
      return page(c.intro.ageQ, p(c.intro.ageHint, 'hint'),
        radioGroup('age', c.intro.ageQ, [['u', c.intro.ageUnder], ['o', c.intro.ageOver]], ci.under, function (v) { ci.under = v; }, 'visually-hidden'),
        err,
        h('div', { class: 'actions' },
          btn(t('ui.common.back'), function () { ci = { step: 'intro' }; render(); }, 'ghost'),
          btn(t('ui.common.next'), function () {
            if (!ci.under) return showError(err, c.pickOne);
            begin(ci.under === 'u' ? 'phqa' : 'phq9');
          })));
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

  /* ---------- Learning, attention and memory ---------- */
  var ln = null;
  function viewLearning(args) {
    var c = HTH.get('learning'), r = c.result, saved = state.learning;

    if (args[0] !== 'check') {
      /* Information page. The self-check is offered at the end. */
      return page(t('ui.sections.learning.title'), p(c.lead, 'lead'),
        h('h2', {}, c.whyTitle), c.why.map(function (s) { return p(s); }),
        h('h2', {}, r.evalTitle), p(r.eval),
        h('h2', {}, c.supportTitle), bullets(c.support),
        card(h('h2', {}, t('ui.topics.ask')), askList([r.ask])),
        card(h('h2', {}, c.checkTitle), p(c.checkLead),
          saved ? p(t('learning.result.lastDone', { date: HTH.fmtDate(saved.date) }), 'hint') : null,
          linkBtn(saved ? c.checkAgain : c.checkStart, 'learning/check', 'secondary')),
        h('h2', {}, c.linksTitle), linkList(c.links));
    }

    if (!ln) ln = { step: saved ? 'result' : 'form', picked: saved ? saved.picked.slice() : [] };
    if (ln.step === 'form') {
      return page(c.checkHeading,
        h('fieldset', { class: 'choices' }, h('legend', {}, c.question), p(c.hint, 'hint'),
          c.items.map(function (it) {
            return tick(it.text, ln.picked.indexOf(it.id) >= 0, function (v) {
              var i = ln.picked.indexOf(it.id);
              if (v && i < 0) ln.picked.push(it.id);
              if (!v && i >= 0) ln.picked.splice(i, 1);
            });
          })),
        p(r.notDiagnosis, 'hint'),
        h('div', { class: 'actions' }, linkBtn(c.backInfo, 'learning', 'ghost'), btn(c.see, function () {
          state.learning = { date: HTH.isoDate(new Date()), picked: ln.picked.slice() }; save();
          ln.step = 'result'; render();
        })));
    }

    var n = saved.picked.length;
    return page(r.title,
      card(n ? [p(t('learning.result.someLead', { n: n }), 'score'),
        bullets(c.items.filter(function (it) { return saved.picked.indexOf(it.id) >= 0; }).map(function (it) { return it.text; })),
        p(r.some), addQuestionBtn(r.ask)] : p(r.none),
        p(r.notDiagnosis, 'hint'), p(t('learning.result.saved', { date: HTH.fmtDate(saved.date) }), 'hint')),
      card(h('h2', {}, c.email),
        p(c.emailNote, 'hint'),
        h('div', { class: 'actions' },
          emailBtn(c.email, c.emailSubject, function () { return HTH.learningText(state); }),
          linkBtn(r.toShare, 'share', 'outline'))),
      h('div', { class: 'actions' }, btn(c.change, function () { ln.step = 'form'; render(); }, 'ghost'), linkBtn(c.backInfo, 'learning', 'ghost')));
  }

  /* ---------- Your care team (patient view) ---------- */
  function viewTeam(args) {
    var c = HTH.get('team'), T = state.team;
    var role = c.roles.filter(function (x) { return x.id === args[0]; })[0];

    if (!role) {
      var hidden = c.roles.filter(function (x) { return T.hidden[x.id]; });
      return page(t('ui.sections.team.title'), p(c.lead, 'lead'),
        h('ul', { class: 'parts' }, HTH.teamRoles(state).map(function (x) {
          return h('li', {}, h('a', { class: 'part', href: '#/team/' + x.id },
            h('span', {}, h('strong', {}, x.name), h('span', { class: 'sub' }, x.what)), icon('arrow', 'sm go')));
        })),
        hidden.length ? card(h('h2', {}, c.hiddenTitle), h('div', { class: 'actions' }, hidden.map(function (x) {
          return btn(t('team.show', { name: x.name }), function () { T.hidden[x.id] = false; save(); render(); }, 'ghost small');
        }))) : null);
    }

    return page(role.name, p(role.what, 'lead'),
      card(h('h2', {}, c.askTitle), askList(role.ask)),
      card(h('h2', {}, c.checkTitle), role.checklist.map(function (it) {
        return tick(it.text, T.done[it.id], function (v) { T.done[it.id] = v; save(); });
      })),
      role.optional ? btn(c.hide, function () { T.hidden[role.id] = true; save(); go('team'); }, 'link') : null,
      h('div', { class: 'actions' }, linkBtn(c.back, 'team', 'ghost')));
  }

  /* ---------- Moving to adult care ---------- */
  function viewTransfer() {
    var c = HTH.get('transfer'), X = state.transfer;
    var bar = h('progress', { max: c.steps.length, value: 0 }), status = p('', 'hint');
    function update() {
      var d = HTH.doneCount(c.steps, X.done);
      bar.value = d; status.textContent = t('transfer.status', { done: d, total: c.steps.length });
    }
    update();
    return page(t('ui.sections.transfer.title'), p(c.lead, 'lead'),
      h('h2', {}, c.findTitle), c.find.map(function (s) { return p(s); }), linkList(c.findLinks),
      h('h2', {}, c.firstTitle), bullets(c.first),
      h('h2', {}, c.bringTitle), bullets(c.bring),
      card(h('h2', {}, c.stepsTitle), p(c.stepsHint, 'hint'), bar, status,
        c.steps.map(function (s) {
          return tick(s.title, X.done[s.id], function (v) { X.done[s.id] = v; save(); update(); }, s.text);
        }),
        h('div', { class: 'field' },
          h('label', { for: 'first-visit' }, c.dateLabel), p(c.dateHint, 'hint'),
          h('input', { id: 'first-visit', type: 'date', value: X.date || '', oninput: function (e) { X.date = e.target.value; save(); } }))));
  }

  /* ---------- summary: download, share, email ---------- */
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
        h('div', { class: 'actions' },
          btn(t(u + 'download'), function () { download(summary(), name); status.textContent = t(u + 'made'); }),
          canShare ? btn(t(u + 'share'), function () {
            navigator.share({ files: [fileOf(summary(), name)], title: t(u + 'fileTitle') }).catch(function () { /* cancelled */ });
          }, 'secondary') : null,
          emailBtn(t(u + 'email'), t(u + 'emailSubject'), function () { return HTH.summaryText(state, inc); })),
        status,
        p(t(u + 'emailNote'), 'hint'),
        p(t(u + 'portalNote'), 'callout')),
      card(h('h2', {}, t(u + 'walletTitle')), p(t(u + 'walletHint')),
        btn(t(u + 'wallet'), function () { download(HTH.buildWalletCard(state), 'heart-wallet-card.pdf'); status.textContent = t(u + 'made'); }, 'secondary')));
  }

  /* ---------- For the care team ---------- */
  function viewPro(args) {
    var c = HTH.get('pro'), id = args[0];

    if (id === 'program') {
      var g = c.program;
      return page(g.title, p(g.lead, 'lead'),
        h('h2', {}, g.coreTitle), p(g.coreIntro),
        h('dl', { class: 'deflist' }, g.core.map(function (x) { return [h('dt', {}, x.name), h('dd', {}, x.text)]; })),
        linkList([{ label: 'Got Transition: Six Core Elements of Health Care Transition', url: 'https://www.gottransition.org/six-core-elements/' }]),
        h('h2', {}, g.timelineTitle), p(g.timelineIntro, 'hint'),
        h('table', { class: 'table' }, h('tbody', {}, g.timeline.map(function (x) {
          return h('tr', {}, h('th', { scope: 'row' }, x.age), h('td', {}, x.text));
        }))),
        h('h2', {}, g.packetTitle), bullets(g.packet),
        h('h2', {}, g.pdfTitle), bullets(g.pdf),
        h('div', { class: 'actions' }, linkBtn(g.backLabel, 'pro', 'ghost')));
    }

    if (id === 'share') {
      var s = c.share;
      return page(s.title, p(s.lead, 'lead'),
        h('div', { class: 'qr-box' },
          h('img', { src: 'assets/qr.svg', alt: s.qrAlt, width: 220, height: 220 }),
          h('div', {}, h('p', { class: 'eyebrow' }, s.address), h('p', { class: 'qr-url' }, s.url),
            h('div', { class: 'actions' },
              h('a', { class: 'btn primary', href: 'assets/flyer.pdf', target: '_blank', rel: 'noopener' }, s.flyer),
              h('a', { class: 'btn outline', href: 'flyer.html', target: '_blank', rel: 'noopener' }, s.flyerPage)))),
        h('h2', {}, s.tipsTitle), bullets(s.tips),
        h('h2', {}, s.noteTitle), p(s.note),
        h('div', { class: 'actions' }, linkBtn(c.program.backLabel, 'pro', 'ghost')));
    }

    var role = c.roles.filter(function (x) { return x.id === id; })[0];
    if (role) {
      return page(role.name, p(role.summary, 'lead'),
        h('h2', {}, c.roleTitle), p(role.role),
        h('h2', {}, c.actionsTitle), bullets(role.actions),
        h('h2', {}, c.coverTitle), bullets(role.cover),
        card(h('h2', {}, c.pagesTitle), h('ul', { class: 'sources' }, role.pages.map(function (x) {
          return h('li', {}, h('a', { href: '#/' + x.route }, x.label));
        }))),
        h('div', { class: 'actions' }, linkBtn(c.back, 'pro', 'ghost'), linkBtn(c.program.title, 'pro/program', 'outline'), linkBtn(t('ui.nav.proShare'), 'pro/share', 'outline')));
    }

    return widePage(c.title, p(c.lead, 'lead'),
      h('h2', { class: 'section-title' }, c.rolesTitle),
      h('div', { class: 'grid' }, c.roles.map(function (x) { return sectionCard('pro/' + x.id, 'clipboard', x.name, x.summary); })),
      h('h2', { class: 'section-title' }, c.resourcesTitle),
      h('div', { class: 'grid' },
        sectionCard('pro/program', 'grid', c.program.title, c.program.lead),
        sectionCard('pro/share', 'navigation', c.share.title, c.share.lead)),
      h('div', { class: 'narrow' }, card(h('h2', {}, c.howTitle), bullets(c.how))));
  }

  /* ---------- about, help ---------- */
  function langPicker() {
    if (HTH.languages.length < 2) return null;
    return h('div', { class: 'field' },
      h('label', { for: 'lang' }, t('ui.common.language')),
      h('select', { id: 'lang', onchange: function (e) { state.lang = e.target.value; save(); loadLang(state.lang).then(function () { render(); }); } },
        HTH.languages.map(function (l) { return h('option', { value: l.code, selected: l.code === HTH.lang }, l.name); })));
  }
  function viewAbout() {
    var u = 'ui.about.';
    return page(t(u + 'title'),
      h('h2', {}, t(u + 'whatTitle')), p(t(u + 'what')),
      h('h2', {}, t(u + 'privacyTitle')), bullets(HTH.get('ui.about.privacy')),
      card(h('h2', {}, t(u + 'eraseTitle')), p(t(u + 'eraseText')), btn(t('ui.footer.erase'), eraseAll, 'danger')),
      langPicker() ? card(langPicker()) : null,
      h('h2', { id: 'sources' }, t(u + 'sourcesTitle')), p(t(u + 'sourcesNote'), 'hint'),
      h('ul', { class: 'sources' }, HTH.get('sources').map(function (s) {
        return h('li', {}, h('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer' }, s.title), h('span', { class: 'muted' }, s.by));
      })));
  }
  function viewHelp() { return page(t('ui.help.title'), crisisPanel(true)); }

  /* ---------- shell and router ---------- */
  var VIEWS = {
    '': viewHome, patients: viewPatients, tools: viewTools, pro: viewPro, about: viewAbout, help: viewHelp,
    transition: viewTransition, heart: viewHeart, living: topicsView('living'), money: topicsView('money'),
    wellbeing: viewWellbeing, learning: viewLearning, transfer: viewTransfer, team: viewTeam,
    passport: viewPassport, ready: viewReady, checkin: viewCheckin, share: viewShare
  };

  function go(path) {
    if (location.hash === '#/' + path) render(); else location.hash = '#/' + path;
  }
  function closeMenus() {
    Array.prototype.forEach.call(document.querySelectorAll('.menu'), function (m) { m.hidden = true; });
    Array.prototype.forEach.call(document.querySelectorAll('.nav-btn'), function (b) { b.setAttribute('aria-expanded', 'false'); });
  }
  function dropdown(label, links) {
    var list = h('ul', { class: 'menu', hidden: true }, links.map(function (l) {
      return h('li', { class: l[2] ? 'menu-top' : null }, h('a', { href: '#/' + l[0] }, l[1]));
    }));
    var b = h('button', { type: 'button', class: 'nav-btn', 'aria-expanded': 'false', onclick: function (e) {
      e.stopPropagation();
      var wasOpen = !list.hidden;
      closeMenus();
      if (!wasOpen) { list.hidden = false; b.setAttribute('aria-expanded', 'true'); }
    } }, label, icon('chevron', 'sm'));
    return h('li', { class: 'has-menu' }, b, list);
  }
  function siteHeader(section) {
    var pro = HTH.get('pro');
    var nav = h('ul', { class: 'nav' },
      dropdown(t('ui.nav.patients'), [['patients', t('ui.nav.patientsAll'), true]].concat(PATIENT.map(function (x) { return [x[0], t('ui.sections.' + x[0] + '.title')]; }))),
      dropdown(t('ui.nav.pro'), [['pro', t('ui.nav.proAll'), true]].concat(pro.roles.map(function (r) { return ['pro/' + r.id, r.name]; }),
        [['pro/program', t('ui.nav.proProgram'), true], ['pro/share', t('ui.nav.proShare')]])),
      dropdown(t('ui.nav.tools'), [['tools', t('ui.nav.toolsAll'), true]].concat(TOOLS.map(function (x) { return [x[0], t('ui.toolItems.' + x[2] + '.title')]; }))),
      h('li', {}, h('a', { class: 'nav-link', href: '#/about', 'aria-current': section === 'about' ? 'page' : null }, t('ui.nav.about'))));
    var head = h('header', { class: 'site-header' },
      h('div', { class: 'util' }, h('div', { class: 'wrap' },
        h('span', {}, t('ui.tagline')),
        h('a', { class: 'help-link', href: '#/help' }, t('ui.helpNow')))),
      h('div', { class: 'wrap bar' },
        h('a', { class: 'brand', href: '#/' }, h('span', { class: 'brand-mark' }, icon('heart')), h('span', {}, t('ui.appName'))),
        h('button', { type: 'button', class: 'menu-toggle', 'aria-expanded': 'false', onclick: function (e) {
          var open = head.classList.toggle('open');
          e.currentTarget.setAttribute('aria-expanded', String(open));
        } }, icon('menu'), h('span', {}, t('ui.menu'))),
        h('nav', { 'aria-label': t('ui.appName') }, nav)));
    return head;
  }
  function crumbs(route, view) {
    if (!route[0]) return null;
    var items = [['', t('ui.homeLabel')]], parent = PARENT[route[0]];
    if (parent === 'patients') items.push(['patients', t('ui.nav.patients')]);
    if (parent === 'tools') items.push(['tools', t('ui.nav.tools')]);
    if (route[0] === 'pro' && route[1]) items.push(['pro', t('ui.nav.pro')]);
    if (route[1] && route[0] !== 'pro') {
      var sec = HTH.get('ui.sections.' + route[0] + '.title') || HTH.get('ui.toolItems.' + route[0] + '.title');
      if (sec) items.push([route[0], sec]);
    }
    return h('nav', { class: 'crumbs', 'aria-label': 'Breadcrumb' }, h('ol', {},
      items.map(function (x) { return h('li', {}, h('a', { href: '#/' + x[0] }, x[1])); }),
      h('li', { 'aria-current': 'page' }, view.getAttribute('data-title'))));
  }
  function siteFooter() {
    var m = HTH.meta, pro = HTH.get('pro');
    function colList(title, links) {
      return h('div', {}, h('h2', {}, title), h('ul', {}, links.map(function (l) { return h('li', {}, h('a', { href: '#/' + l[0] }, l[1])); })));
    }
    return h('footer', { class: 'site-footer' }, h('div', { class: 'wrap' },
      h('div', { class: 'foot-cols' },
        colList(t('ui.nav.patients'), PATIENT.map(function (x) { return [x[0], t('ui.sections.' + x[0] + '.title')]; })),
        colList(t('ui.nav.pro'), pro.roles.map(function (r) { return ['pro/' + r.id, r.name]; }).concat([['pro/program', t('ui.nav.proProgram')], ['pro/share', t('ui.nav.proShare')]])),
        colList(t('ui.nav.tools'), TOOLS.map(function (x) { return [x[0], t('ui.toolItems.' + x[2] + '.title')]; }).concat([['about', t('ui.footer.about')], ['help', t('ui.helpNow')]]))),
      h('div', { class: 'foot-legal' },
        p(t('ui.footer.disclaimer')),
        p(t('ui.footer.version', { v: m.version }) + ' · ' + (m.lastClinicalReview ? t('ui.footer.reviewed', { date: HTH.fmtDate(m.lastClinicalReview) }) : t('ui.footer.notReviewed'))),
        btn(t('ui.footer.erase'), eraseAll, 'link'))));
  }

  function render(focusSel) {
    var route = location.hash.replace(/^#\/?/, '').split('/');
    if (route[0] === 'home' || route[0] === 'welcome') route = ['']; /* addresses from the earlier version */
    if (!VIEWS[route[0]]) route = [''];
    var view = VIEWS[route[0]](route.slice(1));
    var m = HTH.meta, app = document.getElementById('app'), wide = /\bwide\b/.test(view.className);

    app.textContent = '';
    add(app, [
      h('a', { class: 'skip', href: '#main', onclick: function (e) { e.preventDefault(); document.getElementById('main').focus(); } }, t('ui.skip')),
      m.lastClinicalReview ? null : h('p', { class: 'draft-banner' }, t('ui.draftBanner')),
      siteHeader(route[0]),
      h('main', { id: 'main', tabindex: '-1' }, h('div', { class: 'wrap' + (wide ? '' : ' reading') },
        memoryOnly ? p(t('ui.memoryOnly'), 'callout warn') : null,
        crumbs(route, view), view)),
      siteFooter()
    ]);

    document.title = route[0] ? view.getAttribute('data-title') + ' – ' + t('ui.appName') : t('ui.appName') + ' – ' + t('ui.tagline');
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
      if (ci && ci.step === 'result') ci = null; /* leaving a result page ends that run */
      if (rd && rd.step === 'result') rd = null;
      ln = null;
      render();
    });
    document.addEventListener('click', closeMenus);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenus(); });
    render();
  });

  /* Offline use after the first visit. */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(function () { /* offline support is optional */ });
  }
})();
