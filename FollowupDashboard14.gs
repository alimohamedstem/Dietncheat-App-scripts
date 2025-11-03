function onEditActive(e) {
  var sheet = e.range.getSheet();
  if (sheet.getName() !== "Acitve") return; // يشتغل بس على شيت Active

  var row = e.range.getRow();
  var col = e.range.getColumn();

  // لو التعديل مش في العمود C (Status) أو أول صف يبقى مالناش دعوة
  if (col !== 3 || row === 1) return;

  var status = e.range.getValue();
  if (String(status).toLowerCase() === "expired") {
    var code = sheet.getRange(row, 1).getValue();
    var agent = sheet.getRange(row, 2).getValue();

    var targetSS = SpreadsheetApp.openById("1W7bhOcx1JF3fV1UvyJhKvnEKehZZOSGMy2DbXINXKAY");
    var expiredSheet = targetSS.getSheetByName("expiredclients");

    if (!expiredSheet) {
      expiredSheet = targetSS.insertSheet("expiredclients");
      expiredSheet.appendRow(["Code", "Agent", "Status", "Exported At"]);
    }

    // اتأكد إنه مش مكرر
    var lastRow = expiredSheet.getLastRow();
    var existingData = lastRow > 1 
      ? expiredSheet.getRange(2, 1, lastRow-1, 2).getValues().map(r => r[0]+"||"+r[1]) 
      : [];

    var key = code + "||" + agent;
    if (existingData.indexOf(key) === -1) {
      expiredSheet.appendRow([code, agent, status, new Date()]);
    }
  }
}
