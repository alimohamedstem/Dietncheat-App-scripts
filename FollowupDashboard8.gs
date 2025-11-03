function importDistributionData6() {
  var sourceId = "1W7bhOcx1JF3fV1UvyJhKvnEKehZZOSGMy2DbXINXKAY"; // الملف الأصلي
  var targetId = "1cLKyJHDoudD6wQ28f5wjAtMegvQpNg1L-T-V2RP6caY"; // الملف الهدف

  var sourceSS = SpreadsheetApp.openById(sourceId);
  var sourceSh = sourceSS.getSheetByName("Newclients"); // ورقة المصدر

  var targetSS = SpreadsheetApp.openById(targetId);
  var targetSh = targetSS.getSheetByName("Newclients2"); // ورقة الهدف

  // تحديد آخر صف
  var lastRow = sourceSh.getLastRow();

  // جلب البيانات من العمود C (3) إلى K (9 أعمدة)
  var data = sourceSh.getRange(1, 1, lastRow, 12).getValues(); // العمود 3 = C, عدد الأعمدة = 9

  // مسح البيانات القديمة في الهدف
  targetSh.clearContents();

  // لصق البيانات في الهدف (من أول A1)
  targetSh.getRange(1, 1, data.length, data[0].length).setValues(data);
}
