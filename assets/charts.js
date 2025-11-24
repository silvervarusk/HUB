// charts.js - initialize Chart.js charts if canvases are present
(function(){
  function createLine(ctx, labels, data, label){
    return new Chart(ctx, {
      type: 'line',
      data: { labels: labels, datasets: [{ label: label, data: data, borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.08)', tension:0.2 }] },
      options: { responsive:true, maintainAspectRatio:false }
    });
  }

  function createBar(ctx, labels, data, label){
    return new Chart(ctx, {
      type: 'bar',
      data: { labels: labels, datasets: [{ label: label, data: data, backgroundColor: '#60a5fa' }] },
      options: { responsive:true, maintainAspectRatio:false }
    });
  }

  function createDoughnut(ctx, labels, data){
    return new Chart(ctx, {
      type: 'doughnut',
      data: { labels: labels, datasets: [{ data: data, backgroundColor: ['#34d399','#60a5fa','#f59e0b'] }] },
      options: { responsive:true, maintainAspectRatio:false }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    if(window.Chart === undefined) return;

    // CSV loader: try to fetch assets/data/policy_sample.csv and use it if present
    function parseCSV(text){
      var lines = text.replace(/\r/g,'').trim().split('\n');
      if(lines.length < 2) return [];
      var headers = lines[0].split(',').map(h=>h.trim());
      var rows = lines.slice(1).map(function(line){
        var cols = line.split(',').map(c=>c.trim());
        var obj = {};
        headers.forEach(function(h,i){
          var v = cols[i] === undefined ? '' : cols[i];
          var n = Number(v);
          obj[h] = isNaN(n) ? v : n;
        });
        return obj;
      });
      return rows;
    }

    function initFromCSV(rows){
      if(!rows || !rows.length) return false;
      // Line: Year vs PolicyEvents
      var lineEl = document.getElementById('policyLineChart');
      if(lineEl){
        var labels = rows.map(r => String(r.Year));
        var data = rows.map(r => Number(r.PolicyEvents));
        createLine(lineEl.getContext('2d'), labels, data, 'Policy Events');
      }

      // Bar: last-row category breakdown
      var barEl = document.getElementById('policyBarChart');
      if(barEl){
        var last = rows[rows.length-1];
        var cats = ['Health','Education','Transport','Energy'];
        var values = cats.map(c => Number(last[c] || 0));
        createBar(barEl.getContext('2d'), cats, values, 'Policy Count (latest year)');
      }

      return true;
    }

    // Try fetch CSV; if fails, fall back to static examples
    fetch('assets/data/policy_sample.csv').then(function(resp){
      if(!resp.ok) throw new Error('no csv');
      return resp.text();
    }).then(function(text){
      var rows = parseCSV(text);
      if(!initFromCSV(rows)) throw new Error('empty csv');
    }).catch(function(){
      // fallback static charts
      var lineEl = document.getElementById('policyLineChart');
      if(lineEl){
        createLine(lineEl.getContext('2d'), ['2018','2019','2020','2021','2022','2023'], [12,18,25,22,30,35], 'Policy Events');
      }
      var barEl = document.getElementById('policyBarChart');
      if(barEl){
        createBar(barEl.getContext('2d'), ['Health','Education','Transport','Energy'], [14,10,7,6], 'Policy Count (fallback)');
      }
    }).finally(function(){
      // Dashboard and Examples charts (unchanged)
      var dashLine = document.getElementById('dashboardLine');
      if(dashLine){
        createLine(dashLine.getContext('2d'), ['Jan','Feb','Mar','Apr','May','Jun'], [50,60,55,70,80,90], 'Visits');
      }
      var dashDough = document.getElementById('dashboardDoughnut');
      if(dashDough){
        createDoughnut(dashDough.getContext('2d'), ['Direct','Referral','Search'], [45,25,30]);
      }
      var examplesArea = document.getElementById('examplesArea');
      if(examplesArea){
        createLine(examplesArea.getContext('2d'), ['Q1','Q2','Q3','Q4'], [20,40,35,60], 'Quarterly Impact');
      }
    });
  });

})();
