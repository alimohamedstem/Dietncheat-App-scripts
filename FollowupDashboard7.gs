function importDistributionData5() {
  var sourceId = "1DKGdQ_r1RPdmVYORhQxYOjb8BoOznF4GlTdnkgezys4"; // الملف الأصلي
  var targetId = "1cLKyJHDoudD6wQ28f5wjAtMegvQpNg1L-T-V2RP6caY"; // الملف الهدف

  var sourceSS = SpreadsheetApp.openById(sourceId);
  var sourceSh = sourceSS.getSheetByName("NewPlans"); // ورقة المصدر

  var targetSS = SpreadsheetApp.openById(targetId);
  var targetSh = targetSS.getSheetByName("NewPlans2"); // ورقة الهدف

  // تحديد آخر صف
  var lastRow = sourceSh.getLastRow();

  // جلب البيانات من العمود C (3) إلى K (9 أعمدة)
  var data = sourceSh.getRange(1, 5, lastRow, 15).getValues(); // العمود 3 = C, عدد الأعمدة = 9

  // مسح البيانات القديمة في الهدف
  targetSh.clearContents();

  // لصق البيانات في الهدف (من أول A1)
  targetSh.getRange(1, 1, data.length, data[0].length).setValues(data);
}
