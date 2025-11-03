function syncClients() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = ss.getSheetByName("Distribution2");  
  var activeSheet = ss.getSheetByName("Active");         
  var expiredSheet = ss.getSheetByName("expiredclients");

  if (!expiredSheet) {
    expiredSheet = ss.insertSheet("expiredclients");
    expiredSheet.appendRow(["Code", "Agent", "Status", "Expired At"]);
  }

  // اقرأ البيانات
  var lastRow = sourceSheet.getLastRow();
  if (lastRow < 2) return;
  var data = sourceSheet.getRange(2, 1, lastRow - 1, 3).getValues();

  var activeData = activeSheet.getRange(2, 1, Math.max(0, activeSheet.getLastRow() - 1), 3).getValues();
  var expiredData = expiredSheet.getRange(2, 1, Math.max(0, expiredSheet.getLastRow() - 1), 2).getValues();

  var activeMap = {};
  activeData.forEach(function(r) {
    activeMap[r[0] + "||" + r[1]] = r;
  });

  var expiredMap = {};
  expiredData.forEach(function(r) {
    expiredMap[r[0] + "||" + r[1]] = true;
  });

  var newActive = [];
  var newExpired = [];

  data.forEach(function(row) {
    var key = row[0] + "||" + row[1];
    var status = row[2];

    if (status === "Active" || status === "Freeze") {
      if (!activeMap[key] && !expiredMap[key]) {
        newActive.push(row);
      } else {
        // لو موجود بالفعل → حدّث الحالة في المصفوفة
        activeMap[key][2] = status;
      }
    } else if (status === "Expired") {
      if (!expiredMap[key]) {
        var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy");
        newExpired.push([row[0], row[1], status, today]);
      }
      // لو عايز تحذف من Active → هنعمل فلترة لاحقًا
      delete activeMap[key];
    }
  });

  // اكتب Active الجديد كدفعة واحدة
  var finalActive = Object.values(activeMap).concat(newActive);
  activeSheet.getRange(2, 1, finalActive.length, 3).setValues(finalActive);
  if (activeSheet.getLastRow() > finalActive.length + 1) {
    activeSheet.deleteRows(finalActive.length + 2, activeSheet.getLastRow() - (finalActive.length + 1));
  }

  // اكتب Expired الجديد كدفعة واحدة
  if (newExpired.length > 0) {
    expiredSheet.getRange(expiredSheet.getLastRow() + 1, 1, newExpired.length, 4).setValues(newExpired);
  }
}
