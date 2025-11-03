function countAndSendResult() {
  // فتح الشيت الأساسي (Distribution)
  var sourceSS = SpreadsheetApp.openById("1TF0t8pCnUtdNpHx6G6X0zwMFV_yZfjdeUbh8vojiqj0");
  var sourceSheet = sourceSS.getSheetByName("Distribution");

  var startRow = 20889;
  var lastRow = sourceSheet.getLastRow();

  // نجيب بيانات العمودين C و D
  var data = sourceSheet.getRange(startRow, 3, lastRow - startRow + 1, 2).getValues();  
  var count = 0;

  data.forEach(function(row) {
    var colC = row[0];
    var colD = row[1];
    if (colC !== "" && colD === "") {
      count++;
    }
  });

  // فتح الشيت الهدف (Admin)
  var targetSS = SpreadsheetApp.openById("1cLKyJHDoudD6wQ28f5wjAtMegvQpNg1L-T-V2RP6caY");
  var targetSheet = targetSS.getSheetByName("Admin"); // غيّر الاسم لو التاب مش اسمه Admin

  // كتابة النتيجة في A1
  targetSheet.getRange("B1:B2").setValue(count);
}
