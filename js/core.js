/* Core helpers shared by the app and the PDF export. No DOM access in this file. */
(function () {
  'use strict';
  var HTH = window.HTH = window.HTH || {};
  HTH.content = HTH.content || {};
  HTH.lang = 'en';

  /* Look up content by dotted path, e.g. HTH.get('ui.home.title'). */
  HTH.get = function (path) {
    var o = HTH.content[HTH.lang], parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (o == null) return undefined;
      o = o[parts[i]];
    }
    return o;
  };

  /* Translated string with {placeholders} filled in. */
  HTH.t = function (path, vars) {
    var s = HTH.get(path);
    if (typeof s !== 'string') return path;
    return s.replace(/\{(\w+)\}/g, function (m, k) {
      return vars && vars[k] != null ? vars[k] : m;
    });
  };

  HTH.parseDate = function (s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || '');
    return m ? new Date(+m[1], m[2] - 1, +m[3]) : null;
  };
  HTH.isoDate = function (d) {
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  };
  HTH.fmtDate = function (d) {
    if (typeof d === 'string') d = HTH.parseDate(d);
    if (!d) return '';
    try {
      return d.toLocaleDateString(HTH.lang, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return HTH.isoDate(d); }
  };

  /* Current age: from date of birth if the Passport has one, otherwise the age given at
     the start plus the years that have passed since (people use this tool for years). */
  HTH.ageNow = function (state, now) {
    now = now || new Date();
    var dob = HTH.parseDate(state.passport && state.passport.dob);
    if (dob && dob < now) {
      var a = now.getFullYear() - dob.getFullYear();
      if (now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) a--;
      return a;
    }
    var p = state.profile;
    if (!p) return null;
    var set = HTH.parseDate(p.ageSetAt) || now;
    return p.age + Math.max(0, Math.floor((now - set) / (365.25 * 864e5)));
  };

  HTH.bandFor = function (age) {
    if (age < 15) return 'a';
    if (age < 18) return 'b';
    if (age < 22) return 'c';
    return 'd';
  };

  /* Severity band for a screener total, read from the content file. */
  HTH.scoreBand = function (total, instrumentId) {
    var tool = instrumentId ? HTH.instrument(instrumentId) : null;
    var bands = (tool && tool.bands) || HTH.get('checkin.bands') || [], hit = bands[0];
    bands.forEach(function (b) { if (total >= b.min) hit = b; });
    return hit;
  };

  /* Which screener a patient gets (by age), and lookup of a screener by id. */
  HTH.instrumentFor = function (state, kind) {
    if (kind === 'worry') return 'gad7';
    var age = HTH.ageNow(state), cut = HTH.get('checkin.adolescentUnder') || 18;
    return age != null && age < cut ? 'phqa' : 'phq9';
  };
  HTH.instrument = function (id) {
    var all = HTH.get('checkin.instruments') || {};
    return all[id] || all.phq9;
  };

  /* Latest check-in record, optionally of one kind ('mood' or 'worry'). */
  HTH.latestCheckin = function (state, kind) {
    var list = state.checkins || [];
    for (var i = list.length - 1; i >= 0; i--) {
      if (!kind || HTH.instrument(list[i].instrument).kind === kind) return list[i];
    }
    return null;
  };

  /* Am I Ready?: counts for one saved set of answers (2 = yes, 1 = learning, anything else = not yet). */
  HTH.readyCounts = function (rec) {
    var out = { yes: 0, learning: 0, notYet: [], total: 0 }, answers = (rec && rec.answers) || {};
    (HTH.get('ready.groups') || []).forEach(function (g) {
      g.items.forEach(function (it) {
        out.total++;
        if (answers[it.id] === 2) out.yes++;
        else if (answers[it.id] === 1) out.learning++;
        else out.notYet.push(it);
      });
    });
    return out;
  };
  /* Team roles the patient has not hidden. */
  HTH.teamRoles = function (state) {
    var hidden = (state.team && state.team.hidden) || {};
    return (HTH.get('team.roles') || []).filter(function (r) { return !hidden[r.id]; });
  };
  HTH.doneCount = function (items, doneMap) {
    return (items || []).filter(function (it) { return doneMap && doneMap[it.id]; }).length;
  };

  HTH.PARTS = ['about', 'heart', 'surgeries', 'medicines', 'allergies', 'devices', 'team', 'emergency'];

  function has(s) { return !!(s && String(s).trim()); }
  HTH.rows = function (list, key) {
    return (list || []).filter(function (r) { return r && has(r[key]); });
  };
  HTH.partDone = function (p, id) {
    switch (id) {
      case 'about': return has(p.name) && has(p.dob);
      case 'heart': return (p.lesions || []).length > 0 || has(p.diagnosis);
      case 'surgeries': return !!p.surgeriesNone || HTH.rows(p.surgeries, 'what').length > 0;
      case 'medicines': return !!p.medicinesNone || HTH.rows(p.medicines, 'name').length > 0;
      case 'allergies': return has(p.allergies);
      case 'devices': return (p.devices || []).length > 0;
      case 'team': return has(p.pedsName) || has(p.achdName);
      case 'emergency': return HTH.rows(p.emergency, 'name').length > 0;
    }
    return false;
  };
  HTH.partsDone = function (p) {
    return HTH.PARTS.filter(function (id) { return HTH.partDone(p || {}, id); }).length;
  };
})();
