var SITES_SHEET_NAME = 'Sites';
var SITES_HEADERS = ['Key', 'DisplayName', 'Code', 'Active', 'SheetName', 'TreasuryBoxTypes', 'ExtraTabs'];
var SITE_SEED = [
  { key: 'tripoli', displayName: 'Tripoli', code: 'TRP', active: true, sheetName: 'Tripoli', treasuryBoxTypes: ['main', 'sub'], extraTabs: ['passports', 'dpmanual', 'residence'] },
  { key: 'benghazi', displayName: 'Benghazi', code: 'BEN', active: true, sheetName: 'Benghazi', treasuryBoxTypes: ['main'], extraTabs: [] }
];

var VOUCHER_HEADERS = ['Serial', 'Date', 'Type', 'Object', 'Cheque', 'PayTo', 'LinesJSON', 'Total', 'Words', 'IssuedAt', 'IssuedBy', 'Site', 'JobNumber', 'Currency', 'LydEquivalent', 'VoucherRateUsed', 'VoucherRateType', 'Account', 'ContraAccount'];
var RANGES_SHEET_NAME = 'Ranges';
var RANGES_HEADERS = ['Key', 'Start', 'End', 'Current'];
var STAFF_SHEET_NAME = 'Staff';
var STAFF_HEADERS = ['Name', 'Password', 'Site', 'JobNumber', 'Tabs', 'Role',
  'Matrix', 'SiteLockTabs', 'DevBackup', 'ProtectRecords', 'AppSettingsAccess',
  'Blocked', 'BlockedSites', 'ReadOnly', 'ReadOnlySites'];
var TREASURY_SHEET_NAME = 'Treasury';
var PDF_FOLDER_NAME = 'AOS Voucher PDFs';

var APP_SETTINGS_SHEET_NAME = 'AppSettings';

var LOGIN_HISTORY_SHEET_NAME = 'Login History';
// Type (login/logout) was added later, so older sheets get migrated by ensureLoginHistoryTypeColumn_.
var LOGIN_HISTORY_HEADERS = ['Name', 'Role', 'Site', 'Job Number', 'Date', 'Time', 'Timestamp', 'Type'];

var CHART_OF_ACCOUNTS_SHEET_NAME = 'Chart Of Accounts';
var CHART_OF_ACCOUNTS_HEADERS = ['Code', 'Name', 'Type', 'Active'];
var CHART_OF_ACCOUNTS_SEED = [
  { code: '1010', name: 'Cash - Main Box',                    type: 'Asset' },
  { code: '1020', name: 'Cash - Sub Box',                      type: 'Asset' },
  { code: '1030', name: 'Bank Account',                        type: 'Asset' },
  { code: '1100', name: 'Accounts Receivable',                 type: 'Asset' },
  { code: '1150', name: 'Employee Advances',                   type: 'Asset' },
  { code: '1200', name: 'Prepaid Expenses',                    type: 'Asset' },
  { code: '1300', name: 'Food & Supplies Inventory',           type: 'Asset' },
  { code: '1310', name: 'Clothing & Uniform Stock',            type: 'Asset' },
  { code: '1500', name: 'Fixed Assets',                        type: 'Asset' },
  { code: '1510', name: 'Vehicles',                            type: 'Asset' },
  { code: '1520', name: 'Equipment & Machinery',                type: 'Asset' },
  { code: '1530', name: 'Furniture & Office Equipment',        type: 'Asset' },
  { code: '1540', name: 'Buildings & Leasehold Improvements',  type: 'Asset' },
  { code: '1580', name: 'Accumulated Depreciation',            type: 'Asset' },
  { code: '1900', name: 'Other Assets',                        type: 'Asset' },
  { code: '2010', name: 'Accounts Payable',                    type: 'Liability' },
  { code: '2020', name: 'Payroll Payable',                     type: 'Liability' },
  { code: '2030', name: 'Taxes Payable',                       type: 'Liability' },
  { code: '2040', name: 'Social Security Payable',             type: 'Liability' },
  { code: '2100', name: 'Accrued Expenses',                    type: 'Liability' },
  { code: '2200', name: 'Loans Payable',                       type: 'Liability' },
  { code: '2900', name: 'Other Liabilities',                   type: 'Liability' },
  { code: '3010', name: "Owner's Capital",                     type: 'Equity' },
  { code: '3020', name: "Owner's Drawings",                    type: 'Equity' },
  { code: '3900', name: 'Retained Earnings',                   type: 'Equity' },
  { code: '4010', name: 'Cash Receipts - Main',                type: 'Revenue' },
  { code: '4020', name: 'Cash Receipts - Sub',                 type: 'Revenue' },
  { code: '4030', name: 'Bank Receipts',                       type: 'Revenue' },
  { code: '4040', name: 'Contract Revenue',                    type: 'Revenue' },
  { code: '4100', name: 'Interest Income',                     type: 'Revenue' },
  { code: '4110', name: 'Foreign Exchange Gain',               type: 'Revenue' },
  { code: '4900', name: 'Other Income',                        type: 'Revenue' },
  { code: '5010', name: 'Cash Payments',                       type: 'Expense' },
  { code: '5020', name: 'Bank Payments',                       type: 'Expense' },
  { code: '5030', name: 'Petty Cash Expenses',                 type: 'Expense' },
  { code: '5040', name: 'Payroll / Pay Slips',                 type: 'Expense' },
  { code: '5050', name: 'Advance Payments',                    type: 'Expense' },
  { code: '5060', name: 'Settlements',                         type: 'Expense' },
  { code: '5070', name: 'Refunds',                             type: 'Expense' },
  { code: '5100', name: 'Rent Expense',                        type: 'Expense' },
  { code: '5110', name: 'Utilities Expense',                   type: 'Expense' },
  { code: '5120', name: 'Communication & Internet Expense',    type: 'Expense' },
  { code: '5130', name: 'Fuel & Transportation Expense',       type: 'Expense' },
  { code: '5140', name: 'Vehicle Maintenance & Repairs',       type: 'Expense' },
  { code: '5150', name: 'Office Supplies & Stationery',        type: 'Expense' },
  { code: '5160', name: 'Food & Catering Expense',             type: 'Expense' },
  { code: '5170', name: 'Uniforms & Clothing Expense',         type: 'Expense' },
  { code: '5180', name: 'Medical & Insurance Expense',         type: 'Expense' },
  { code: '5190', name: 'Professional & Legal Fees',           type: 'Expense' },
  { code: '5200', name: 'Bank Charges & Fees',                 type: 'Expense' },
  { code: '5210', name: 'Foreign Exchange Loss',               type: 'Expense' },
  { code: '5220', name: 'Depreciation Expense',                type: 'Expense' },
  { code: '5230', name: 'Desert Pass & Travel Permit Expense', type: 'Expense' },
  { code: '5240', name: 'Passport & Visa Processing Expense',  type: 'Expense' },
  { code: '5900', name: 'Other Expenses',                      type: 'Expense' }
];

var INDEX_HTML_FILE_NAME = 'Index';
var DP_RANGE_PREFIX = 'DP_';

function doGet(e) {
  if (!e || !e.parameter || !e.parameter.action) {
    return HtmlService.createHtmlOutputFromFile(INDEX_HTML_FILE_NAME)
      .setTitle('AOS ERP System')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  try {
    var action = e.parameter.action;
    switch (action) {
      case 'log':                 return jsonOut({ ok: true, log: readAllVouchers() });
      case 'ranges':               return jsonOut({ ok: true, ranges: readRanges() });
      case 'staff':                { var stfR = readStaffWithRev_(); return jsonOut({ ok: true, staff: stfR.staff, rev: stfR.rev }); }
      case 'treasury':             { var trR = readBlobWithRev_(TREASURY_SHEET_NAME); return jsonOut({ ok: true, data: trR.data, rev: trR.rev }); }
      case 'appSettings':          { var asR = readBlobWithRev_(APP_SETTINGS_SHEET_NAME); return jsonOut({ ok: true, data: asR.data, rev: asR.rev }); }
      case 'sites':                { var stR = readSitesWithRev_(); return jsonOut({ ok: true, sites: stR.sites, rev: stR.rev }); }

      case 'foodCost':             { var fcR = readBlobWithRev_('FoodCost'); return jsonOut({ ok: true, data: fcR.data, rev: fcR.rev }); }
      case 'foodCostLog':          { var fclR = readJsonRowsWithRev_('FoodCostLog'); return jsonOut({ ok: true, rows: fclR.rows, rev: fclR.rev }); }

      case 'foodStockList': { var fstR = readFoodStockWithRev_(); return jsonOut({ ok: true, rows: fstR.rows, rev: fstR.rev }); }
      case 'foodStockMoveLog':     return jsonOut({ ok: true, log: readFoodStockMoves_() });

      case 'stockSiteList': { var stkR = readStockSiteWithRev_(); return jsonOut({ ok: true, rows: stkR.rows, rev: stkR.rev }); }
      case 'stockSiteMoveLog':     return jsonOut({ ok: true, log: readStockSiteMoves_() });

      case 'passportList': { var psR = readJsonRowsWithRev_('Passports'); return jsonOut({ ok: true, rows: psR.rows, rev: psR.rev }); }
      case 'dpLog':                return jsonOut({ ok: true, log: readJsonRows_('DesertPass') });

      case 'residenceList': { var resR = readJsonRowsWithRev_('Residence'); return jsonOut({ ok: true, rows: resR.rows, rev: resR.rev }); }

      case 'dpManualList': { var dpmR = readJsonRowsWithRev_('DpManual'); return jsonOut({ ok: true, rows: dpmR.rows, rev: dpmR.rev }); }
      case 'dpManualMovesList': { var dpmmR = readJsonRowsWithRev_('DpManualMoves'); return jsonOut({ ok: true, rows: dpmmR.rows, rev: dpmmR.rev }); }

      case 'opsMgmtRoster':        { var omrR = readBlobWithRev_('OpsRoster'); return jsonOut({ ok: true, data: omrR.data, rev: omrR.rev }); }
      case 'opsMgmtDaily':         { var omdR = readBlobWithRev_('OpsDaily'); return jsonOut({ ok: true, data: omdR.data, rev: omdR.rev }); }

      case 'customListDefs': { var cldR = readBlobWithRev_('CustomListDefs'); return jsonOut({ ok: true, data: cldR.data, rev: cldR.rev }); }
      case 'customListData': { var clR = readJsonRowsWithRev_(customListSheetName_(e.parameter.listId)); return jsonOut({ ok: true, rows: clR.rows, rev: clR.rev }); }

      case 'loginHistory':         return jsonOut({ ok: true, rows: readLoginHistory_() });

      case 'chartOfAccounts':      { var coaR = readChartOfAccountsWithRev_(); return jsonOut({ ok: true, accounts: coaR.accounts, rev: coaR.rev }); }

      case 'payrollTypesList': { var ptR = readJsonRowsWithRev_('PayrollTypes'); return jsonOut({ ok: true, rows: ptR.rows, rev: ptR.rev }); }
      case 'payrollEmployeesList': { var peR = readJsonRowsWithRev_('PayrollEmployees'); return jsonOut({ ok: true, rows: peR.rows, rev: peR.rev }); }
      case 'payrollRunsList': { var prR = readJsonRowsWithRev_('PayrollRuns'); return jsonOut({ ok: true, rows: prR.rows, rev: prR.rev }); }

      case 'siteMoveSitesList': { var smsR = readJsonRowsWithRev_('SiteMoveSites'); return jsonOut({ ok: true, rows: smsR.rows, rev: smsR.rev }); }
      case 'siteMoveLogList': { var smlR = readJsonRowsWithRev_('SiteMoveLog'); return jsonOut({ ok: true, rows: smlR.rows, rev: smlR.rev }); }
      case 'siteMoveOpening': { var smoR = readBlobWithRev_('SiteMoveOpening'); return jsonOut({ ok: true, data: smoR.data, rev: smoR.rev }); }

      case 'accommodation':        { var accR = readBlobWithRev_('Accommodation'); return jsonOut({ ok: true, data: accR.data, rev: accR.rev }); }

      case 'library':              { var libR = readBlobWithRev_('Library'); return jsonOut({ ok: true, data: libR.data, rev: libR.rev }); }

      case 'overtimeSettingsGet': { var otsR = readBlobWithRev_('OvertimeSettings'); return jsonOut({ ok: true, settings: otsR.data, rev: otsR.rev }); }
      case 'overtimeEmpConfigGet': { var otcR = readBlobWithRev_('OvertimeEmpConfig'); return jsonOut({ ok: true, config: otcR.data, rev: otcR.rev }); }
      case 'overtimeEntriesList': { var oteR = readJsonRowsWithRev_('OvertimeEntries'); return jsonOut({ ok: true, rows: oteR.rows, rev: oteR.rev }); }

      case 'hrLeaveList': { var hrR = readJsonRowsWithRev_('HRLeave'); return jsonOut({ ok: true, rows: hrR.rows, rev: hrR.rev }); }

      case 'outlookContactsList': { var olcR = readJsonRowsWithRev_('OutlookContacts'); return jsonOut({ ok: true, rows: olcR.rows, rev: olcR.rev }); }
      case 'outlookDraftsList': { var oldR = readJsonRowsWithRev_('OutlookDrafts'); return jsonOut({ ok: true, rows: oldR.rows, rev: oldR.rev }); }

      case 'diagAuth': {
        var key = PropertiesService.getScriptProperties().getProperty('OCR_SPACE_API_KEY');
        return jsonOut({
          ok: true,
          keyIsSet: !!key,
          keyPreview: key ? (key.substring(0, 4) + '...' + key.substring(key.length - 4)) : null,
          scriptId: ScriptApp.getScriptId()
        });
      }

      case 'voucherRecycleBin':    return jsonOut({ ok: true, rows: readJsonRows_(VOUCHER_RECYCLE_BIN_SHEET_NAME) });

      case 'devBackupServerConfigGet': return jsonOut(aosBkOnGetConfig_());

      default:
        return jsonOut({ ok: false, error: 'Unknown or missing action: ' + action });
    }
  } catch (err) {
    return jsonOut({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    switch (payload.action) {
      case 'issue':                 return jsonOut(issueVoucher(payload));
      case 'saveRange':             return jsonOut(saveRange(payload));
      case 'clearLog':              clearAllVouchers(payload.actorName); resetVoucherSerials_(); return jsonOut({ ok: true });
      case 'clearLoginHistory':     clearSheetRowsLocked_(LOGIN_HISTORY_SHEET_NAME); return jsonOut({ ok: true });
      case 'clearDesertPassLog':    clearSheetRowsLocked_('DesertPass'); resetDesertPassSerials_(); return jsonOut({ ok: true });
      case 'resetVoucherSerials':    return jsonOut(resetVoucherSerials_());
      case 'resetDesertPassSerials': return jsonOut(resetDesertPassSerials_());
      case 'resetAllSerials':        return jsonOut(resetAllSerials_());
      case 'saveStaff':             return jsonOut(writeStaff(payload.staff || {}, payload.rev));
      case 'updateVoucher':         return jsonOut(updateVoucher(payload));
      case 'deleteVoucher':         return jsonOut(deleteVoucher(payload));
      case 'saveTreasury':          return jsonOut(writeBlob_(TREASURY_SHEET_NAME, payload.data || {}, payload.rev));
      case 'clearTreasury':         return jsonOut(writeBlob_(TREASURY_SHEET_NAME, {}));
      case 'uploadPdf':             return jsonOut(uploadPdf(payload));

      case 'saveAppSettings':       return jsonOut(writeAppSettings(payload.data || {}, payload.rev));

      case 'saveSites':             return jsonOut(saveSites(payload.sites || [], payload.rev));

      case 'saveChartOfAccounts':   return jsonOut(saveChartOfAccounts(payload.accounts || [], payload.rev));

      case 'payrollTypesSaveAll':     return jsonOut(writeJsonRows_('PayrollTypes', payload.rows || [], payload.rev));
      case 'payrollEmployeesSaveAll': return jsonOut(writeJsonRows_('PayrollEmployees', payload.rows || [], payload.rev));
      case 'payrollRunsSaveAll':      return jsonOut(writeJsonRows_('PayrollRuns', payload.rows || [], payload.rev));

      case 'siteMoveSitesSaveAll':    return jsonOut(writeJsonRows_('SiteMoveSites', payload.rows || [], payload.rev));
      case 'siteMoveLogSaveAll':      return jsonOut(writeJsonRows_('SiteMoveLog', payload.rows || [], payload.rev));
      case 'siteMoveOpeningSaveAll':  return jsonOut(writeBlob_('SiteMoveOpening', payload.data || {}, payload.rev));

      case 'saveFoodCost':          return jsonOut(writeBlob_('FoodCost', payload.data || {}, payload.rev));
      case 'saveFoodCostLog':       return jsonOut(writeJsonRows_('FoodCostLog', payload.rows || [], payload.rev));

      case 'accommodationSaveAll':    return jsonOut(writeBlob_('Accommodation', payload.data || {}, payload.rev));

      case 'saveLibrary':             return jsonOut(writeBlob_('Library', payload.data || {}, payload.rev));

      case 'overtimeSettingsSave':    return jsonOut(writeBlob_('OvertimeSettings', payload.settings || {}, payload.rev));
      case 'overtimeEmpConfigSave':   return jsonOut(writeBlob_('OvertimeEmpConfig', payload.config || {}, payload.rev));
      case 'overtimeEntriesSaveAll':  return jsonOut(writeJsonRows_('OvertimeEntries', payload.rows || [], payload.rev));

      case 'hrLeaveSaveAll':          return jsonOut(writeJsonRows_('HRLeave', payload.rows || [], payload.rev));

      case 'outlookContactsSaveAll':  return jsonOut(writeJsonRows_('OutlookContacts', payload.rows || [], payload.rev));
      case 'outlookDraftsSaveAll':    return jsonOut(writeJsonRows_('OutlookDrafts', payload.rows || [], payload.rev));

      case 'nextDpSerial':          return jsonOut(nextDesertPassSerial(payload));
      case 'setDesertPassSerial':   return jsonOut(setDesertPassSerial(payload));

      case 'scanReceipt':           return jsonOut(handleScanReceipt_(payload));

      case 'foodStockSaveAll':      return jsonOut(writeFoodStock_(payload.rows || [], payload.rev));
      case 'foodStockMoveSave':     appendFoodStockMove_(payload.move || {}); return jsonOut({ ok: true });
      case 'foodStockMoveDelete':   deleteFoodStockMove_(payload.site, payload.id); return jsonOut({ ok: true });
      case 'foodStockClearMoveLog': clearSheetRowsLocked_('FoodStockMoves'); return jsonOut({ ok: true });

      case 'stockSiteSaveAll':      return jsonOut(writeStockSite_(payload.rows || [], payload.rev));
      case 'stockSiteMoveSave':     appendStockSiteMove_(payload.category, payload.site, payload.move || {}); return jsonOut({ ok: true });
      case 'stockSiteMoveDelete':   deleteStockSiteMove_(payload.category, payload.site, payload.id); return jsonOut({ ok: true });
      case 'stockSiteClearMoveLog': clearStockSiteMovesForCategory_(payload.category); return jsonOut({ ok: true });

      case 'passportSaveAll':       return jsonOut(writeJsonRows_('Passports', payload.rows || [], payload.rev));

      case 'dpSave':                appendJsonRow_('DesertPass', payload.pass || {}); return jsonOut({ ok: true });

      case 'residenceSaveAll':      return jsonOut(writeJsonRows_('Residence', payload.rows || [], payload.rev));

      case 'dpManualSaveAll':       return jsonOut(writeJsonRows_('DpManual', payload.rows || [], payload.rev));
      case 'dpManualMovesSaveAll':  return jsonOut(writeJsonRows_('DpManualMoves', payload.rows || [], payload.rev));

      case 'opsMgmtSaveRoster':     return jsonOut(writeBlob_('OpsRoster', payload.data || {}, payload.rev));
      case 'opsMgmtSaveDaily':      return jsonOut(writeBlob_('OpsDaily', payload.data || {}, payload.rev));

      case 'saveCustomListDefs':    return jsonOut(writeBlob_('CustomListDefs', payload.data || {}, payload.rev));
      case 'customListDataSaveAll': return jsonOut(writeJsonRows_(customListSheetName_(payload.listId), payload.rows || [], payload.rev));
      case 'customListDeleteAll':   clearSheetRowsLocked_(customListSheetName_(payload.listId)); return jsonOut({ ok: true });

      case 'logLogin':              return jsonOut(logLogin_(payload));

      case 'voucherRestore':        return jsonOut(restoreVoucherFromRecycleBin(payload));
      case 'voucherRestoreBulk':    return jsonOut(restoreVouchersFromRecycleBin(payload));
      case 'voucherRecycleBinPurge': return jsonOut(purgeVoucherRecycleBin(payload));

      case 'restoreVoucherLogMerge':        return jsonOut(restoreVoucherLogMerge(payload));
      case 'restoreRangesMerge':            return jsonOut(restoreRangesMerge(payload));
      case 'restoreFoodStockMoveLogMerge':  return jsonOut(restoreFoodStockMoveLogMerge(payload));
      case 'restoreStockSiteMoveLogMerge':  return jsonOut(restoreStockSiteMoveLogMerge(payload));
      case 'restoreDesertPassLogMerge':     return jsonOut(restoreDesertPassLogMerge(payload));

      case 'devBackupServerConfigSet': return jsonOut(aosBkOnSetConfig_(payload));
      case 'devBackupServerRunNow':    return jsonOut(aosBkOnRunNow_(payload));

      default:
        return jsonOut({ ok: false, error: 'Unknown action: ' + payload.action });
    }
  } catch (err) {
    return jsonOut({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function nowIsoLocal_() {
  return Utilities.formatDate(new Date(), 'Africa/Tripoli', "yyyy-MM-dd'T'HH:mm:ss");
}

function ss_() { return SpreadsheetApp.getActiveSpreadsheet(); }

// Shared lock wrapper for every whole-sheet/whole-blob write below.
// Locked functions are all "leaves" - none call another locked function while holding the lock.
function withScriptLock_(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

// Revision counters for optimistic-concurrency checks. A client that last read revision N gets
// rejected (not silently overwritten) if it tries to save after someone else has bumped past N.
// Append-only logs (Vouchers, Desert Pass log, move logs, Login History) don't need this.
var REVISIONS_SHEET_NAME = 'Revisions';
var REVISIONS_HEADERS = ['Key', 'Rev'];
function getRevUnlocked_(key) {
  var sh = getOrCreateSheet_(REVISIONS_SHEET_NAME, REVISIONS_HEADERS);
  var data = sh.getDataRange().getValues();
  for (var r = 1; r < data.length; r++) {
    if (data[r][0] === key) return Number(data[r][1]) || 0;
  }
  return 0;
}
function bumpRevUnlocked_(key) {
  var sh = getOrCreateSheet_(REVISIONS_SHEET_NAME, REVISIONS_HEADERS);
  var data = sh.getDataRange().getValues();
  for (var r = 1; r < data.length; r++) {
    if (data[r][0] === key) {
      var next = (Number(data[r][1]) || 0) + 1;
      sh.getRange(r + 1, 2).setValue(next);
      return next;
    }
  }
  sh.appendRow([key, 1]);
  return 1;
}
function revConflict_(currentRev) {
  return {
    ok: false,
    conflict: true,
    serverRev: currentRev,
    error: 'Someone else saved changes just now. Reload the latest data before saving again, or your changes may overwrite theirs.'
  };
}

function getOrCreateSheet_(name, headers) {
  var sh = ss_().getSheetByName(name);
  if (!sh) {
    sh = ss_().insertSheet(name);
    sh.appendRow(headers || ['Data']);
    sh.setFrozenRows(1);
  }
  return sh;
}

// Unfreezes rows before deleteRows() (Sheets refuses to delete all non-frozen rows otherwise),
// then restores the freeze.
function clearSheetRows_(name) {
  var sh = ss_().getSheetByName(name);
  if (!sh) return;
  var lastRow = sh.getLastRow();
  if (lastRow <= 1) return;
  var frozen = sh.getFrozenRows();
  if (frozen > 0) sh.setFrozenRows(0);
  sh.deleteRows(2, lastRow - 1);
  if (frozen > 0) sh.setFrozenRows(frozen);
}

function clearSheetRowsLocked_(name) {
  withScriptLock_(function () {
    clearSheetRows_(name);
  });
}

// Blob pattern: one JSON object per sheet, chunked across rows so a single value never exceeds
// a Sheets cell's character limit.
var BLOB_CHUNK_SIZE_ = 45000;
function readBlobUnlocked_(sheetName) {
  var sh = getOrCreateSheet_(sheetName, ['Data']);
  var lastRow = sh.getLastRow();
  if (lastRow < 2) return {};
  var values = sh.getRange(2, 1, lastRow - 1, 1).getValues();
  var json = values.map(function (row) { return row[0] || ''; }).join('');
  if (!json) return {};
  try { return JSON.parse(json); } catch (e) { return {}; }
}
function readBlob_(sheetName) {
  return withScriptLock_(function () {
    return readBlobUnlocked_(sheetName);
  });
}
function readBlobWithRev_(sheetName) {
  return withScriptLock_(function () {
    return { data: readBlobUnlocked_(sheetName), rev: getRevUnlocked_(sheetName) };
  });
}
function writeBlob_(sheetName, dataObj, expectedRev) {
  return withScriptLock_(function () {
    if (expectedRev !== undefined && expectedRev !== null && expectedRev !== '') {
      var currentRev = getRevUnlocked_(sheetName);
      if (Number(expectedRev) !== currentRev) return revConflict_(currentRev);
    }
    var sh = getOrCreateSheet_(sheetName, ['Data']);
    var json = JSON.stringify(dataObj);
    var chunks = [];
    for (var i = 0; i < json.length; i += BLOB_CHUNK_SIZE_) chunks.push(json.slice(i, i + BLOB_CHUNK_SIZE_));
    if (!chunks.length) chunks = [''];
    var lastRow = sh.getLastRow();
    if (lastRow > 1) {
      var frozen = sh.getFrozenRows();
      if (frozen > 0) sh.setFrozenRows(0);
      sh.deleteRows(2, lastRow - 1);
      if (frozen > 0) sh.setFrozenRows(frozen);
    }
    var rows = chunks.map(function (c) { return [c]; });
    sh.getRange(2, 1, rows.length, 1).setValues(rows);
    return { ok: true, rev: bumpRevUnlocked_(sheetName) };
  });
}

function readJsonRowsUnlocked_(sheetName) {
  var sh = ss_().getSheetByName(sheetName);
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    try { out.push(JSON.parse(data[r][0])); } catch (e) { }
  }
  return out;
}
function readJsonRows_(sheetName) {
  return withScriptLock_(function () {
    return readJsonRowsUnlocked_(sheetName);
  });
}
function readJsonRowsWithRev_(sheetName) {
  return withScriptLock_(function () {
    return { rows: readJsonRowsUnlocked_(sheetName), rev: getRevUnlocked_(sheetName) };
  });
}
function writeJsonRowsUnlocked_(sheetName, rows) {
  var sh = getOrCreateSheet_(sheetName, ['Record (JSON)', 'Preview']);
  clearSheetRows_(sheetName);
  if (rows.length) {
    var out = rows.map(function (r) { return [JSON.stringify(r), previewOf_(r)]; });
    sh.getRange(2, 1, out.length, 2).setValues(out);
  }
}
function writeJsonRows_(sheetName, rows, expectedRev) {
  return withScriptLock_(function () {
    if (expectedRev !== undefined && expectedRev !== null && expectedRev !== '') {
      var currentRev = getRevUnlocked_(sheetName);
      if (Number(expectedRev) !== currentRev) return revConflict_(currentRev);
    }
    writeJsonRowsUnlocked_(sheetName, rows);
    return { ok: true, rev: bumpRevUnlocked_(sheetName) };
  });
}
function appendJsonRowsUnlocked_(sheetName, rows) {
  if (!rows || !rows.length) return;
  var sh = getOrCreateSheet_(sheetName, ['Record (JSON)', 'Preview']);
  var out = rows.map(function (r) { return [JSON.stringify(r), previewOf_(r)]; });
  sh.getRange(sh.getLastRow() + 1, 1, out.length, 2).setValues(out);
}
function appendJsonRow_(sheetName, row) {
  withScriptLock_(function () {
    appendJsonRowsUnlocked_(sheetName, [row]);
  });
}
function previewOf_(r) {
  if (!r || typeof r !== 'object') return String(r);
  var bits = [];
  ['name', 'serial', 'passport', 'empId', 'idx', 'date', 'site'].forEach(function (k) {
    if (r[k] !== undefined && r[k] !== '') bits.push(r[k]);
  });
  return bits.join(' — ');
}

function customListSheetName_(listId) {
  return 'CL_' + slugify_(String(listId || 'list'));
}

function slugify_(name) {
  var s = String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return s || 'site';
}
function readSites_() {
  var sh = ss_().getSheetByName(SITES_SHEET_NAME);
  if (!sh) {
    sh = ss_().insertSheet(SITES_SHEET_NAME);
    sh.appendRow(SITES_HEADERS);
    sh.setFrozenRows(1);
    var seedRows = SITE_SEED.map(function (s) {
      return [s.key, s.displayName, s.code, true, s.sheetName, s.treasuryBoxTypes.join(','), s.extraTabs.join(',')];
    });
    sh.getRange(2, 1, seedRows.length, SITES_HEADERS.length).setValues(seedRows);
  }
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out.push({
      key: data[r][0],
      displayName: data[r][1] || data[r][0],
      code: data[r][2] || 'GEN',
      active: data[r][3] === true || String(data[r][3]).toUpperCase() === 'TRUE',
      sheetName: data[r][4] || data[r][1] || data[r][0],
      treasuryBoxTypes: String(data[r][5] || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean),
      extraTabs: String(data[r][6] || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean)
    });
  }
  return out;
}
function readSitesWithRev_() {
  return withScriptLock_(function () {
    return { sites: readSites_(), rev: getRevUnlocked_(SITES_SHEET_NAME) };
  });
}
function allSiteSheetNames_() {
  return readSites_().map(function (s) { return s.sheetName; });
}
function siteByDisplayName_(displayName) {
  var sites = readSites_();
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].displayName === displayName || sites[i].key === displayName) return sites[i];
  }
  return null;
}
function saveSites(sitesPayload, expectedRev) {
  return withScriptLock_(function () {
    if (expectedRev !== undefined && expectedRev !== null && expectedRev !== '') {
      var currentRev = getRevUnlocked_(SITES_SHEET_NAME);
      if (Number(expectedRev) !== currentRev) return revConflict_(currentRev);
    }
    if (!Array.isArray(sitesPayload) || !sitesPayload.length) {
      return { ok: false, error: 'At least one site is required.' };
    }
    var existing = readSites_();
    var existingByKey = {};
    existing.forEach(function (s) { existingByKey[s.key] = s; });

    var seenCodes = {};
    var rowsOut = [];
    for (var i = 0; i < sitesPayload.length; i++) {
      var incoming = sitesPayload[i] || {};
      var displayName = String(incoming.displayName || '').trim();
      var code = String(incoming.code || '').trim().toUpperCase();
      if (!displayName) return { ok: false, error: 'Every site needs a name.' };
      if (!/^[A-Z]{2,4}$/.test(code)) return { ok: false, error: 'Site "' + displayName + '": code must be 2-4 letters (e.g. TRP).' };
      if (code === 'DP') return { ok: false, error: 'Site "' + displayName + '": the code "DP" is reserved for Desert Pass serials — pick another.' };
      if (seenCodes[code]) return { ok: false, error: 'Site code "' + code + '" is used more than once — codes must be unique.' };
      seenCodes[code] = true;

      var key = incoming.key && existingByKey[incoming.key] ? incoming.key : null;
      var prior = key ? existingByKey[key] : null;

      if (prior && prior.code !== code) {
        var siteSheet = ss_().getSheetByName(prior.sheetName);
        var hasVouchers = siteSheet && siteSheet.getLastRow() > 1;
        var hasRanges = false;
        var rangesSheet = ss_().getSheetByName(RANGES_SHEET_NAME);
        if (rangesSheet) {
          var rangesData = rangesSheet.getDataRange().getValues();
          for (var rr = 1; rr < rangesData.length; rr++) {
            if (String(rangesData[rr][0] || '').indexOf(prior.code + '_') === 0) { hasRanges = true; break; }
          }
        }
        if (hasVouchers || hasRanges) {
          return { ok: false, error: 'Site "' + displayName + '": its code ("' + prior.code + '") can\'t be changed anymore — vouchers already exist under it. Deactivate it and add a new site instead if you need a different code.' };
        }
      }

      var newKey = key || slugify_(displayName);
      if (!key) {
        var suffix = 1;
        while (existingByKey[newKey] && existingByKey[newKey].displayName !== displayName) {
          newKey = slugify_(displayName) + '_' + (++suffix);
        }
        existingByKey[newKey] = { key: newKey, displayName: displayName };
      }
      var sheetName = prior ? prior.sheetName : displayName;
      var treasuryBoxTypes = Array.isArray(incoming.treasuryBoxTypes) ? incoming.treasuryBoxTypes.filter(function (t) { return t === 'main' || t === 'sub'; }) : [];
      var extraTabs = Array.isArray(incoming.extraTabs) ? incoming.extraTabs.map(String) : [];

      rowsOut.push([newKey, displayName, code, incoming.active !== false, sheetName, treasuryBoxTypes.join(','), extraTabs.join(',')]);
    }

    var sh = getOrCreateSheet_(SITES_SHEET_NAME, SITES_HEADERS);
    var lastRow = sh.getLastRow();
    if (lastRow > 1) sh.deleteRows(2, lastRow - 1);
    sh.getRange(2, 1, rowsOut.length, SITES_HEADERS.length).setValues(rowsOut);
    return { ok: true, sites: readSites_(), rev: bumpRevUnlocked_(SITES_SHEET_NAME) };
  });
}

function siteCodeFor_(site) {
  var s = siteByDisplayName_(site);
  return s ? s.code : 'GEN';
}
function sheetNameForSite_(site) {
  var s = siteByDisplayName_(site);
  return s ? s.sheetName : 'Other';
}
function findVoucherRow_(serial) {
  var m = /^AOS-([A-Za-z]+)-/.exec(serial);
  var sites = readSites_();
  var candidateSheets = sites.map(function (s) { return s.sheetName; });
  if (m) {
    var preferredSite = sites.filter(function (s) { return s.code === m[1]; })[0];
    if (preferredSite) {
      candidateSheets = [preferredSite.sheetName].concat(candidateSheets.filter(function (s) { return s !== preferredSite.sheetName; }));
    }
  }
  for (var i = 0; i < candidateSheets.length; i++) {
    var sh = getOrCreateSheet_(candidateSheets[i], VOUCHER_HEADERS);
    var data = sh.getDataRange().getValues();
    for (var r = 1; r < data.length; r++) {
      if (data[r][0] === serial) return { sheet: sh, rowIndex: r + 1, row: data[r] };
    }
  }
  return null;
}
function pad_(n, len) {
  var s = String(n);
  while (s.length < len) s = '0' + s;
  return s;
}
function rowToVoucher_(row, siteSheetName) {
  var lines = [];
  try { lines = JSON.parse(row[6] || '[]'); } catch (e) { lines = []; }
  return {
    serial: row[0], date: cellAsFormattedString_(row[1], 'yyyy-MM-dd'), type: row[2], object: row[3], cheque: row[4], payto: row[5],
    lines: lines, total: Number(row[7]) || 0, words: row[8], issuedAt: row[9], issuedBy: row[10],
    issuedBySite: row[11] || siteSheetName, issuedByJobNumber: row[12],
    currency: row[13] || 'LYD',
    lydEquivalent: (row[14] !== undefined && row[14] !== '') ? Number(row[14]) : null,
    voucherRateUsed: (row[15] !== undefined && row[15] !== '') ? Number(row[15]) : null,
    voucherRateType: row[16] || null,
    account: row[17] || '',
    contraAccount: row[18] || ''
  };
}
function readAllVouchers() {
  return withScriptLock_(function () {
    var all = [];
    allSiteSheetNames_().forEach(function (siteName) {
      var sh = getOrCreateSheet_(siteName, VOUCHER_HEADERS);
      var data = sh.getDataRange().getValues();
      for (var r = 1; r < data.length; r++) {
        if (!data[r][0]) continue;
        all.push(rowToVoucher_(data[r], siteName));
      }
    });
    return all;
  });
}
// Every row is snapshotted into the recycle bin before it's deleted, so a "Clear shared log"
// is always fully recoverable afterward.
function clearAllVouchers(actorName) {
  withScriptLock_(function () {
    var removedAt = nowIsoLocal_();
    allSiteSheetNames_().forEach(function (siteName) {
      var sh = getOrCreateSheet_(siteName, VOUCHER_HEADERS);
      var lastRow = sh.getLastRow();
      if (lastRow > 1) {
        var data = sh.getRange(2, 1, lastRow - 1, VOUCHER_HEADERS.length).getValues();
        var entries = [];
        for (var r = 0; r < data.length; r++) {
          if (!data[r][0]) continue;
          entries.push(voucherRecycleEntry_(data[r], siteName, 'clear', actorName, removedAt));
        }
        if (entries.length) appendJsonRowsUnlocked_(VOUCHER_RECYCLE_BIN_SHEET_NAME, entries);
        sh.deleteRows(2, lastRow - 1);
      }
    });
  });
}
function issueVoucher(payload) {
  var required = ['date', 'object', 'payto', 'type', 'lines', 'total', 'words'];
  for (var i = 0; i < required.length; i++) {
    if (payload[required[i]] === undefined || payload[required[i]] === null) {
      return { ok: false, error: 'Missing field: ' + required[i] };
    }
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var site = payload.issuedBySite || '';
    var siteRecord = siteByDisplayName_(site);
    if (siteRecord && !siteRecord.active) {
      return { ok: false, error: 'Site "' + site + '" is deactivated — reactivate it in Settings > "Manage sites" before issuing vouchers under it.' };
    }
    var siteCode = siteCodeFor_(site);
    var sheetName = sheetNameForSite_(site);
    var yKey = String(payload.date).slice(0, 4);
    var rangeKey = siteCode + '_' + yKey;
    var rangesSheet = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
    var rangesData = rangesSheet.getDataRange().getValues();
    var rangeRowIndex = -1;
    var start = 1, end = 99999, current = 1;
    for (var r = 1; r < rangesData.length; r++) {
      if (rangesData[r][0] === rangeKey) {
        rangeRowIndex = r + 1;
        start = Number(rangesData[r][1]) || 1;
        end = Number(rangesData[r][2]) || 99999;
        current = Number(rangesData[r][3]) || start;
        break;
      }
    }
    var seq = current;
    if (seq > end) {
      return { ok: false, error: 'Sequence range exhausted for ' + site + ' (' + yKey + '). Extend it in Serial Settings.' };
    }
    var d = String(payload.date);
    var ddmmyy = d.slice(8, 10) + d.slice(5, 7) + d.slice(2, 4);
    var serial = 'AOS-' + siteCode + '-' + ddmmyy + '-' + pad_(seq, 5);
    var voucherSheet = getOrCreateSheet_(sheetName, VOUCHER_HEADERS);
    voucherSheet.appendRow([
      serial, payload.date, payload.type, payload.object, payload.cheque || '', payload.payto,
      JSON.stringify(payload.lines || []), payload.total, payload.words, nowIsoLocal_(),
      payload.issuedBy || '', site, payload.issuedByJobNumber || '',
      payload.currency || 'LYD',
      (payload.lydEquivalent !== undefined && payload.lydEquivalent !== null) ? payload.lydEquivalent : '',
      (payload.voucherRateUsed !== undefined && payload.voucherRateUsed !== null) ? payload.voucherRateUsed : '',
      payload.voucherRateType || '',
      payload.account || '',
      payload.contraAccount || ''
    ]);
    if (rangeRowIndex === -1) {
      rangesSheet.appendRow([rangeKey, start, end, seq + 1]);
    } else {
      rangesSheet.getRange(rangeRowIndex, 4).setValue(seq + 1);
    }
    return { ok: true, serial: serial };
  } finally {
    lock.releaseLock();
  }
}
// The row's pre-edit contents are always snapshotted into the recycle bin first, so a wrong
// edit is recoverable, not just deletions.
function updateVoucher(payload) {
  return withScriptLock_(function () {
    var found = findVoucherRow_(payload.serial);
    if (!found) return { ok: false, error: 'Voucher not found: ' + payload.serial };
    var sh = found.sheet;
    var rowIndex = found.rowIndex;
    var existing = found.row;
    appendJsonRowsUnlocked_(VOUCHER_RECYCLE_BIN_SHEET_NAME, [voucherRecycleEntry_(existing, sh.getName(), 'update', payload.actorName)]);
    sh.getRange(rowIndex, 1, 1, VOUCHER_HEADERS.length).setValues([[
      existing[0],
      payload.date !== undefined ? payload.date : existing[1],
      payload.type !== undefined ? payload.type : existing[2],
      payload.object !== undefined ? payload.object : existing[3],
      payload.cheque !== undefined ? payload.cheque : existing[4],
      payload.payto !== undefined ? payload.payto : existing[5],
      payload.lines !== undefined ? JSON.stringify(payload.lines) : existing[6],
      payload.total !== undefined ? payload.total : existing[7],
      payload.words !== undefined ? payload.words : existing[8],
      existing[9], existing[10], existing[11], existing[12],
      existing[13], existing[14], existing[15], existing[16],
      payload.account !== undefined ? payload.account : existing[17],
      payload.contraAccount !== undefined ? payload.contraAccount : existing[18]
    ]]);
    var updatedRow = sh.getRange(rowIndex, 1, 1, VOUCHER_HEADERS.length).getValues()[0];
    return { ok: true, voucher: rowToVoucher_(updatedRow, sh.getName()) };
  });
}
function deleteVoucher(payload) {
  return withScriptLock_(function () {
    var found = findVoucherRow_(payload.serial);
    if (!found) return { ok: false, error: 'Voucher not found: ' + payload.serial };
    appendJsonRowsUnlocked_(VOUCHER_RECYCLE_BIN_SHEET_NAME, [voucherRecycleEntry_(found.row, found.sheet.getName(), 'delete', payload.actorName)]);
    found.sheet.deleteRow(found.rowIndex);
    return { ok: true };
  });
}

// Voucher log recycle bin: the log itself is append-only by design, so instead of a hard
// delete, updateVoucher/deleteVoucher/clearAllVouchers snapshot the affected row(s) here first.
// Restoring re-appends the original row under its original serial; a restore is refused if a
// voucher with that serial already exists live, to avoid a duplicate-serial row.
var VOUCHER_RECYCLE_BIN_SHEET_NAME = 'VoucherRecycleBin';

function voucherRecycleEntry_(row, sheetName, action, actorName, removedAt) {
  var normalizedRow = row.map(function (v) {
    return (v instanceof Date) ? Utilities.formatDate(v, 'Africa/Tripoli', 'yyyy-MM-dd') : v;
  });
  return {
    id: Utilities.getUuid(),
    action: action, // 'update' | 'delete' | 'clear'
    serial: row[0],
    site: sheetName,
    row: normalizedRow,
    removedAt: removedAt || nowIsoLocal_(),
    removedBy: actorName || '',
    restored: false,
    restoredAt: '',
    restoredBy: ''
  };
}

function restoreVoucherFromRecycleBin(payload) {
  return withScriptLock_(function () {
    var rows = readJsonRowsUnlocked_(VOUCHER_RECYCLE_BIN_SHEET_NAME);
    var idx = -1;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id === payload.id) { idx = i; break; }
    }
    if (idx === -1) return { ok: false, error: 'Recycle bin entry not found — it may have already been restored or purged.' };
    var entry = rows[idx];
    if (entry.restored) return { ok: false, error: 'This entry was already restored on ' + entry.restoredAt + (entry.restoredBy ? (' by ' + entry.restoredBy) : '') + '.' };

    var already = findVoucherRow_(entry.serial);
    if (already) {
      return { ok: false, error: 'Voucher ' + entry.serial + ' already exists in the live log — restoring this snapshot would create a duplicate serial. Remove or rename the existing live voucher first if you really want this exact version back.' };
    }

    var sh = getOrCreateSheet_(entry.site, VOUCHER_HEADERS);
    sh.appendRow(entry.row);

    entry.restored = true;
    entry.restoredAt = nowIsoLocal_();
    entry.restoredBy = payload.actorName || '';
    rows[idx] = entry;
    writeJsonRowsUnlocked_(VOUCHER_RECYCLE_BIN_SHEET_NAME, rows);

    return { ok: true, serial: entry.serial };
  });
}

function restoreVouchersFromRecycleBin(payload) {
  var ids = Array.isArray(payload.ids) ? payload.ids : [];
  var results = ids.map(function (id) {
    var r = restoreVoucherFromRecycleBin({ id: id, actorName: payload.actorName });
    r.id = id;
    return r;
  });
  var okCount = results.filter(function (r) { return r.ok; }).length;
  return { ok: true, restored: okCount, total: ids.length, results: results };
}

function purgeVoucherRecycleBin(payload) {
  clearSheetRowsLocked_(VOUCHER_RECYCLE_BIN_SHEET_NAME);
  return { ok: true };
}

// Restore-from-backup merge actions: Vouchers, Ranges, Desert Pass log, and the two stock
// move logs are append-only, so restoring a backup only adds records that aren't already live
// (matched by serial/id) — it never overwrites or removes anything. Safe to run the same
// backup twice.

function restoreVoucherLogMerge(payload) {
  return withScriptLock_(function () {
    var vouchers = Array.isArray(payload.vouchers) ? payload.vouchers : [];
    var bySheet = {};
    var inserted = 0, skipped = 0;
    vouchers.forEach(function (v) {
      if (!v || !v.serial) { skipped++; return; }
      if (findVoucherRow_(v.serial)) { skipped++; return; }
      var sheetName = sheetNameForSite_(v.issuedBySite || '');
      if (!bySheet[sheetName]) bySheet[sheetName] = [];
      bySheet[sheetName].push([
        v.serial, v.date || '', v.type || '', v.object || '', v.cheque || '', v.payto || '',
        JSON.stringify(v.lines || []), v.total || 0, v.words || '', v.issuedAt || '', v.issuedBy || '',
        v.issuedBySite || '', v.issuedByJobNumber || '', v.currency || 'LYD',
        (v.lydEquivalent !== undefined && v.lydEquivalent !== null) ? v.lydEquivalent : '',
        (v.voucherRateUsed !== undefined && v.voucherRateUsed !== null) ? v.voucherRateUsed : '',
        v.voucherRateType || '', v.account || '', v.contraAccount || ''
      ]);
      inserted++;
    });
    Object.keys(bySheet).forEach(function (sheetName) {
      var sh = getOrCreateSheet_(sheetName, VOUCHER_HEADERS);
      var rows = bySheet[sheetName];
      sh.getRange(sh.getLastRow() + 1, 1, rows.length, VOUCHER_HEADERS.length).setValues(rows);
    });
    return { ok: true, inserted: inserted, skipped: skipped, total: vouchers.length };
  });
}

function restoreRangesMerge(payload) {
  return withScriptLock_(function () {
    var incoming = payload.ranges || {};
    var sh = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
    var data = sh.getDataRange().getValues();
    var existingKeys = {};
    for (var r = 1; r < data.length; r++) { if (data[r][0]) existingKeys[data[r][0]] = true; }
    var rowsToAppend = [];
    var inserted = 0, skipped = 0;
    Object.keys(incoming).forEach(function (key) {
      if (existingKeys[key]) { skipped++; return; }
      var v = incoming[key] || {};
      var start = Number(v.start) || 1;
      rowsToAppend.push([key, start, Number(v.end) || 99999, Number(v.current) || start]);
      inserted++;
    });
    if (rowsToAppend.length) sh.getRange(sh.getLastRow() + 1, 1, rowsToAppend.length, RANGES_HEADERS.length).setValues(rowsToAppend);
    return { ok: true, inserted: inserted, skipped: skipped, total: Object.keys(incoming).length };
  });
}

function restoreFoodStockMoveLogMerge(payload) {
  return withScriptLock_(function () {
    var incoming = Array.isArray(payload.moves) ? payload.moves : [];
    var sh = getOrCreateSheet_('FoodStockMoves', FOOD_STOCK_MOVES_HEADERS);
    var data = sh.getDataRange().getValues();
    var existingIds = {};
    for (var r = 1; r < data.length; r++) { if (data[r][0]) existingIds[data[r][0]] = true; }
    var rowsToAppend = [];
    var inserted = 0, skipped = 0;
    incoming.forEach(function (m) {
      if (!m || !m.id || existingIds[m.id]) { skipped++; return; }
      rowsToAppend.push([m.id, m.site || '', m.date || '', m.itemId || '', m.itemName || '', m.qtyIn || 0, m.qtyOut || 0, m.notes || '']);
      existingIds[m.id] = true;
      inserted++;
    });
    if (rowsToAppend.length) sh.getRange(sh.getLastRow() + 1, 1, rowsToAppend.length, FOOD_STOCK_MOVES_HEADERS.length).setValues(rowsToAppend);
    return { ok: true, inserted: inserted, skipped: skipped, total: incoming.length };
  });
}

function restoreStockSiteMoveLogMerge(payload) {
  return withScriptLock_(function () {
    var incoming = Array.isArray(payload.moves) ? payload.moves : [];
    var sh = getOrCreateSheet_('StockSiteMoves', STOCK_SITE_MOVES_HEADERS);
    var data = sh.getDataRange().getValues();
    var existingKeys = {};
    for (var r = 1; r < data.length; r++) {
      if (!data[r][2]) continue;
      existingKeys[data[r][0] + '|' + data[r][1] + '|' + data[r][2]] = true;
    }
    var rowsToAppend = [];
    var inserted = 0, skipped = 0;
    incoming.forEach(function (m) {
      if (!m || !m.id) { skipped++; return; }
      var k = (m.category || '') + '|' + (m.site || '') + '|' + m.id;
      if (existingKeys[k]) { skipped++; return; }
      rowsToAppend.push([m.category || '', m.site || '', m.id, m.date || '', m.itemId || '', m.content || '', m.qtyIn || 0, m.qtyOut || 0, m.notes || '']);
      existingKeys[k] = true;
      inserted++;
    });
    if (rowsToAppend.length) sh.getRange(sh.getLastRow() + 1, 1, rowsToAppend.length, STOCK_SITE_MOVES_HEADERS.length).setValues(rowsToAppend);
    return { ok: true, inserted: inserted, skipped: skipped, total: incoming.length };
  });
}

function restoreDesertPassLogMerge(payload) {
  var incoming = Array.isArray(payload.entries) ? payload.entries : [];
  return withScriptLock_(function () {
    var existing = readJsonRowsUnlocked_('DesertPass');
    var existingKeys = {};
    existing.forEach(function (r) { existingKeys[r && (r.serial || JSON.stringify(r))] = true; });
    var toAppend = [];
    var inserted = 0, skipped = 0;
    incoming.forEach(function (r) {
      var k = r && (r.serial || JSON.stringify(r));
      if (!k || existingKeys[k]) { skipped++; return; }
      toAppend.push(r);
      existingKeys[k] = true;
      inserted++;
    });
    if (toAppend.length) appendJsonRowsUnlocked_('DesertPass', toAppend);
    return { ok: true, inserted: inserted, skipped: skipped, total: incoming.length };
  });
}

function readRanges() {
  var sh = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
  var data = sh.getDataRange().getValues();
  var out = {};
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out[data[r][0]] = { start: Number(data[r][1]) || 1, end: Number(data[r][2]) || 99999, current: Number(data[r][3]) || 1 };
  }
  return out;
}
// "Current" is only reset when the caller explicitly passes payload.current — an ordinary
// Start/End save from Serial Settings leaves the running counter alone instead of rewinding it.
function saveRange(payload) {
  return withScriptLock_(function () {
    var site = payload.site || '';
    var siteCode = siteCodeFor_(site);
    var key = siteCode + '_' + payload.year;
    var start = Number(payload.start) || 1;
    var end = Number(payload.end) || 99999;
    var hasCurrent = payload.current !== undefined && payload.current !== null && payload.current !== '';
    var sh = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
    var data = sh.getDataRange().getValues();
    for (var r = 1; r < data.length; r++) {
      if (data[r][0] === key) {
        var existingCurrent = Number(data[r][3]) || start;
        var newCurrent = hasCurrent ? Number(payload.current) : existingCurrent;
        sh.getRange(r + 1, 2, 1, 3).setValues([[start, end, newCurrent]]);
        return { ok: true };
      }
    }
    var initialCurrent = hasCurrent ? Number(payload.current) : start;
    sh.appendRow([key, start, end, initialCurrent]);
    return { ok: true };
  });
}

// Resets the running "Current" counter back to "Start" without touching the configured range.
function resetRangesMatching_(matchFn) {
  return withScriptLock_(function () {
    var sh = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
    var data = sh.getDataRange().getValues();
    var resetCount = 0;
    for (var r = 1; r < data.length; r++) {
      var key = String(data[r][0] || '');
      if (!key || !matchFn(key)) continue;
      var start = Number(data[r][1]) || 1;
      sh.getRange(r + 1, 4).setValue(start);
      resetCount++;
    }
    return { ok: true, resetCount: resetCount };
  });
}
function resetVoucherSerials_() {
  return resetRangesMatching_(function (key) { return key.indexOf(DP_RANGE_PREFIX) !== 0; });
}
function resetDesertPassSerials_() {
  return resetRangesMatching_(function (key) { return key.indexOf(DP_RANGE_PREFIX) === 0; });
}
function resetAllSerials_() {
  return resetRangesMatching_(function (key) { return true; });
}

function nextDesertPassSerial(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var d = String(payload.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'));
    var yKey = d.slice(0, 4);
    var rangeKey = DP_RANGE_PREFIX + yKey;
    var rangesSheet = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
    var rangesData = rangesSheet.getDataRange().getValues();
    var rangeRowIndex = -1;
    var start = 1, end = 999999, current = 1;
    for (var r = 1; r < rangesData.length; r++) {
      if (rangesData[r][0] === rangeKey) {
        rangeRowIndex = r + 1;
        start = Number(rangesData[r][1]) || 1;
        end = Number(rangesData[r][2]) || 999999;
        current = Number(rangesData[r][3]) || start;
        break;
      }
    }
    var seq = current;
    if (seq > end) {
      return { ok: false, error: 'Desert Pass sequence range exhausted for ' + yKey + '.' };
    }
    var ddmmyy = d.slice(8, 10) + d.slice(5, 7) + d.slice(2, 4);
    var serial = 'AOS-DP-' + ddmmyy + '-' + pad_(seq, 4);
    if (rangeRowIndex === -1) {
      rangesSheet.appendRow([rangeKey, start, end, seq + 1]);
    } else {
      rangesSheet.getRange(rangeRowIndex, 4).setValue(seq + 1);
    }
    return { ok: true, serial: serial };
  } finally {
    lock.releaseLock();
  }
}

function setDesertPassSerial(payload) {
  return withScriptLock_(function () {
    var year = payload.year;
    if (!year) return { ok: false, error: 'Year is required.' };
    var newCurrent = Number(payload.current);
    if (!newCurrent || newCurrent < 1) return { ok: false, error: 'A valid serial number is required.' };
    var rangeKey = DP_RANGE_PREFIX + year;
    var sh = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
    var data = sh.getDataRange().getValues();
    for (var r = 1; r < data.length; r++) {
      if (data[r][0] === rangeKey) {
        sh.getRange(r + 1, 4).setValue(newCurrent);
        return { ok: true };
      }
    }
    sh.appendRow([rangeKey, 1, 999999, newCurrent]);
    return { ok: true };
  });
}

// Extends an older Staff sheet up to the full STAFF_HEADERS width without touching existing data.
function ensureStaffRoleColumn_(sh) {
  var lastCol = Math.max(sh.getLastColumn(), 1);
  var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0];
  for (var i = 0; i < STAFF_HEADERS.length; i++) {
    if (headers[i] !== STAFF_HEADERS[i]) {
      sh.getRange(1, i + 1).setValue(STAFF_HEADERS[i]);
    }
  }
}
function readStaffUnlocked_() {
  var sh = getOrCreateSheet_(STAFF_SHEET_NAME, STAFF_HEADERS);
  ensureStaffRoleColumn_(sh);
  var data = sh.getDataRange().getValues();
  var out = {};
  for (var r = 1; r < data.length; r++) {
    var name = data[r][0];
    if (!name) continue;
    var tabs = String(data[r][4] || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var matrix = {};
    try { matrix = data[r][6] ? JSON.parse(data[r][6]) : {}; } catch (e) { matrix = {}; }
    var siteLockTabs = {};
    try { siteLockTabs = data[r][7] ? JSON.parse(data[r][7]) : {}; } catch (e) { siteLockTabs = {}; }
    var blockedSites = [];
    try { blockedSites = data[r][12] ? JSON.parse(data[r][12]) : []; } catch (e) { blockedSites = []; }
    var readOnlySites = [];
    try { readOnlySites = data[r][14] ? JSON.parse(data[r][14]) : []; } catch (e) { readOnlySites = []; }
    out[name] = {
      pass: data[r][1] || '', site: data[r][2] || '', jobNumber: data[r][3] || '',
      tabs: tabs.length ? tabs : ['new', 'log', 'search', 'cashflow', 'treasury', 'settings'],
      role: data[r][5] === 'admin' ? 'admin' : 'user',
      matrix: matrix,
      siteLockTabs: siteLockTabs,
      devBackup: data[r][8] === true || data[r][8] === 'true',
      protectRecords: data[r][9] === true || data[r][9] === 'true',
      appSettingsAccess: data[r][10] || '',
      blocked: data[r][11] === true || data[r][11] === 'true',
      blockedSites: blockedSites,
      readOnly: data[r][13] === true || data[r][13] === 'true',
      readOnlySites: readOnlySites
    };
  }
  return out;
}
function readStaff() {
  return withScriptLock_(function () {
    return readStaffUnlocked_();
  });
}
function readStaffWithRev_() {
  return withScriptLock_(function () {
    return { staff: readStaffUnlocked_(), rev: getRevUnlocked_(STAFF_SHEET_NAME) };
  });
}
function writeStaff(staffObj, expectedRev) {
  return withScriptLock_(function () {
    if (expectedRev !== undefined && expectedRev !== null && expectedRev !== '') {
      var currentRev = getRevUnlocked_(STAFF_SHEET_NAME);
      if (Number(expectedRev) !== currentRev) return revConflict_(currentRev);
    }
    var sh = getOrCreateSheet_(STAFF_SHEET_NAME, STAFF_HEADERS);
    ensureStaffRoleColumn_(sh);
    var lastRow = sh.getLastRow();
    if (lastRow > 1) sh.deleteRows(2, lastRow - 1);
    var rows = Object.keys(staffObj).map(function (name) {
      var entry = staffObj[name] || {};
      return [
        name,
        entry.pass || '',
        entry.site || '',
        entry.jobNumber || '',
        (entry.tabs || []).join(','),
        entry.role === 'admin' ? 'admin' : 'user',
        JSON.stringify(entry.matrix || {}),
        JSON.stringify(entry.siteLockTabs || {}),
        entry.devBackup ? 'true' : 'false',
        entry.protectRecords ? 'true' : 'false',
        entry.appSettingsAccess || '',
        entry.blocked ? 'true' : 'false',
        JSON.stringify(entry.blockedSites || []),
        entry.readOnly ? 'true' : 'false',
        JSON.stringify(entry.readOnlySites || [])
      ];
    });
    if (rows.length) sh.getRange(2, 1, rows.length, STAFF_HEADERS.length).setValues(rows);
    return { ok: true, rev: bumpRevUnlocked_(STAFF_SHEET_NAME) };
  });
}

function readTreasury() { return readBlob_(TREASURY_SHEET_NAME); }
function writeTreasury(dataObj) { writeBlob_(TREASURY_SHEET_NAME, dataObj); }

function readAppSettings() { return readBlob_(APP_SETTINGS_SHEET_NAME); }
function writeAppSettings(dataObj, expectedRev) { return writeBlob_(APP_SETTINGS_SHEET_NAME, dataObj, expectedRev); }

function cellAsFormattedString_(v, pattern) {
  if (v instanceof Date) return Utilities.formatDate(v, 'Africa/Tripoli', pattern);
  return String(v || '');
}

function ensureLoginHistoryTypeColumn_(sh) {
  var lastCol = Math.max(sh.getLastColumn(), 1);
  var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0];
  if (headers[LOGIN_HISTORY_HEADERS.length - 1] !== 'Type') {
    sh.getRange(1, LOGIN_HISTORY_HEADERS.length).setValue('Type');
  }
}

function readLoginHistory_() {
  var sh = getOrCreateSheet_(LOGIN_HISTORY_SHEET_NAME, LOGIN_HISTORY_HEADERS);
  ensureLoginHistoryTypeColumn_(sh);
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out.push({
      name: String(data[r][0] || ''),
      role: String(data[r][1] || 'user'),
      site: String(data[r][2] || ''),
      jobNumber: String(data[r][3] || ''),
      date: cellAsFormattedString_(data[r][4], 'yyyy-MM-dd'),
      time: cellAsFormattedString_(data[r][5], 'HH:mm:ss'),
      timestamp: String(data[r][6] || ''),
      type: (String(data[r][7] || '').toLowerCase() === 'logout') ? 'logout' : 'login'
    });
  }
  return out;
}

function readChartOfAccountsUnlocked_() {
  var sh = ss_().getSheetByName(CHART_OF_ACCOUNTS_SHEET_NAME);
  if (!sh) {
    sh = ss_().insertSheet(CHART_OF_ACCOUNTS_SHEET_NAME);
    sh.appendRow(CHART_OF_ACCOUNTS_HEADERS);
    sh.setFrozenRows(1);
    var seedRows = CHART_OF_ACCOUNTS_SEED.map(function (a) {
      return [a.code, a.name, a.type, true];
    });
    sh.getRange(2, 1, seedRows.length, CHART_OF_ACCOUNTS_HEADERS.length).setValues(seedRows);
  } else {
    var existingData = sh.getDataRange().getValues();
    var existingCodes = {};
    for (var er = 1; er < existingData.length; er++) {
      if (existingData[er][0]) existingCodes[String(existingData[er][0])] = true;
    }
    var missingRows = CHART_OF_ACCOUNTS_SEED
      .filter(function (a) { return !existingCodes[a.code]; })
      .map(function (a) { return [a.code, a.name, a.type, true]; });
    if (missingRows.length) {
      sh.getRange(sh.getLastRow() + 1, 1, missingRows.length, CHART_OF_ACCOUNTS_HEADERS.length).setValues(missingRows);
    }
  }
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out.push({
      code: String(data[r][0]),
      name: String(data[r][1] || ''),
      type: String(data[r][2] || 'Expense'),
      active: data[r][3] === true || String(data[r][3]).toUpperCase() === 'TRUE' || data[r][3] === ''
    });
  }
  return out;
}
function readChartOfAccounts_() {
  return withScriptLock_(function () {
    return readChartOfAccountsUnlocked_();
  });
}
function readChartOfAccountsWithRev_() {
  return withScriptLock_(function () {
    return { accounts: readChartOfAccountsUnlocked_(), rev: getRevUnlocked_(CHART_OF_ACCOUNTS_SHEET_NAME) };
  });
}
function saveChartOfAccounts(accountsPayload, expectedRev) {
  return withScriptLock_(function () {
    if (expectedRev !== undefined && expectedRev !== null && expectedRev !== '') {
      var currentRev = getRevUnlocked_(CHART_OF_ACCOUNTS_SHEET_NAME);
      if (Number(expectedRev) !== currentRev) return revConflict_(currentRev);
    }
    if (!Array.isArray(accountsPayload) || !accountsPayload.length) {
      return { ok: false, error: 'At least one account is required.' };
    }
    var validTypes = { Asset: 1, Liability: 1, Equity: 1, Revenue: 1, Expense: 1 };
    var seenCodes = {};
    var rowsOut = [];
    for (var i = 0; i < accountsPayload.length; i++) {
      var a = accountsPayload[i] || {};
      var code = String(a.code || '').trim();
      var name = String(a.name || '').trim();
      var type = String(a.type || '').trim();
      if (!code || !name) return { ok: false, error: 'Every account needs a code and a name.' };
      if (!validTypes[type]) return { ok: false, error: 'Account "' + name + '": type must be Asset, Liability, Equity, Revenue or Expense.' };
      if (seenCodes[code]) return { ok: false, error: 'Account code "' + code + '" is used more than once — codes must be unique.' };
      seenCodes[code] = true;
      rowsOut.push([code, name, type, a.active !== false]);
    }
    var sh = getOrCreateSheet_(CHART_OF_ACCOUNTS_SHEET_NAME, CHART_OF_ACCOUNTS_HEADERS);
    var lastRow = sh.getLastRow();
    if (lastRow > 1) sh.deleteRows(2, lastRow - 1);
    sh.getRange(2, 1, rowsOut.length, CHART_OF_ACCOUNTS_HEADERS.length).setValues(rowsOut);
    return { ok: true, accounts: readChartOfAccountsUnlocked_(), rev: bumpRevUnlocked_(CHART_OF_ACCOUNTS_SHEET_NAME) };
  });
}
function logLogin_(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sh = getOrCreateSheet_(LOGIN_HISTORY_SHEET_NAME, LOGIN_HISTORY_HEADERS);
    ensureLoginHistoryTypeColumn_(sh);
    sh.appendRow([
      payload.name || '',
      payload.role || 'user',
      payload.site || '',
      payload.jobNumber || '',
      payload.date || '',
      payload.time || '',
      payload.timestamp || nowIsoLocal_(),
      payload.type === 'logout' ? 'logout' : 'login'
    ]);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function handleScanReceipt_(payload) {
  var props = PropertiesService.getScriptProperties();
  var apiKey = props.getProperty('OCR_SPACE_API_KEY');
  if (!apiKey) {
    return { ok: false, error: 'OCR.space API key not set on the server. In the Apps Script editor: Project Settings > Script Properties > Add property, name OCR_SPACE_API_KEY, value = your OCR.space API key (get a free one at ocr.space/ocrapi).' };
  }
  if (!payload || !payload.imageBase64) {
    return { ok: false, error: 'No image data received.' };
  }
  var mimeType = payload.mimeType || 'image/jpeg';
  var engine = props.getProperty('OCR_SPACE_ENGINE') || '3';
  var language = props.getProperty('OCR_SPACE_LANGUAGE') || 'auto';
  var dataUri = 'data:' + mimeType + ';base64,' + payload.imageBase64;

  var resp;
  try {
    resp = UrlFetchApp.fetch('https://api.ocr.space/parse/image', {
      method: 'post',
      muteHttpExceptions: true,
      payload: {
        apikey: apiKey,
        base64Image: dataUri,
        language: language,
        OCREngine: engine,
        scale: 'true',
        detectOrientation: 'true',
        isOverlayRequired: 'false'
      }
    });
  } catch (err) {
    return { ok: false, error: 'Could not reach OCR.space: ' + err.message };
  }

  var json;
  try {
    json = JSON.parse(resp.getContentText());
  } catch (e) {
    return { ok: false, error: 'OCR.space returned an unreadable response (HTTP ' + resp.getResponseCode() + ').' };
  }

  if (json.IsErroredOnProcessing) {
    var msg = json.ErrorMessage
      ? (Array.isArray(json.ErrorMessage) ? json.ErrorMessage.join(' ') : json.ErrorMessage)
      : (json.ErrorDetails || 'Unknown OCR.space error.');
    return { ok: false, error: 'OCR.space error: ' + msg };
  }

  var results = json.ParsedResults;
  var text = (results && results[0] && results[0].ParsedText) || '';
  return { ok: true, text: text };
}

// Run once manually from the Apps Script editor to wipe the Treasury sheet back to empty.
function resetTreasuryNow() {
  writeTreasury({});
  Logger.log('Treasury reset to empty.');
}

function authorizeScript() {
  try { UrlFetchApp.fetch('https://www.google.com', { muteHttpExceptions: true }); } catch (e) { }
  try { DriveApp.getRootFolder(); } catch (e) { }
  try { ss_(); } catch (e) { }
  try { PropertiesService.getScriptProperties().getProperty('OCR_SPACE_API_KEY'); } catch (e) { }
  Logger.log('Authorization check complete. If no prompt appeared, all permissions are already granted.');
}

function uploadPdf(payload) {
  var folders = DriveApp.getFoldersByName(PDF_FOLDER_NAME);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(PDF_FOLDER_NAME);
  var base64 = String(payload.base64 || '').replace(/^data:application\/pdf;base64,/, '');
  var bytes = Utilities.base64Decode(base64);
  var blob = Utilities.newBlob(bytes, 'application/pdf', (payload.filename || 'voucher') + '.pdf');
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return { ok: true, viewUrl: file.getUrl() };
}

var FOOD_STOCK_HEADERS = ['Site', 'ItemId', 'Name', 'Unit', 'Qty', 'Reorder'];
var FOOD_STOCK_MOVES_HEADERS = ['Id', 'Site', 'Date', 'ItemId', 'ItemName', 'QtyIn', 'QtyOut', 'Notes'];

function readFoodStockUnlocked_() {
  var sh = ss_().getSheetByName('FoodStock');
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0] && !data[r][1]) continue;
    out.push({ site: data[r][0], itemId: data[r][1], name: data[r][2], unit: data[r][3], qty: data[r][4], reorder: data[r][5] });
  }
  return out;
}
function readFoodStock_() {
  return withScriptLock_(function () { return readFoodStockUnlocked_(); });
}
function readFoodStockWithRev_() {
  return withScriptLock_(function () {
    return { rows: readFoodStockUnlocked_(), rev: getRevUnlocked_('FoodStock') };
  });
}
function writeFoodStock_(rows, expectedRev) {
  return withScriptLock_(function () {
    if (expectedRev !== undefined && expectedRev !== null && expectedRev !== '') {
      var currentRev = getRevUnlocked_('FoodStock');
      if (Number(expectedRev) !== currentRev) return revConflict_(currentRev);
    }
    var sh = getOrCreateSheet_('FoodStock', FOOD_STOCK_HEADERS);
    clearSheetRows_('FoodStock');
    if (rows.length) {
      var out = rows.map(function (r) { return [r.site || '', r.itemId || '', r.name || '', r.unit || '', r.qty || 0, r.reorder || 0]; });
      sh.getRange(2, 1, out.length, FOOD_STOCK_HEADERS.length).setValues(out);
    }
    return { ok: true, rev: bumpRevUnlocked_('FoodStock') };
  });
}
function readFoodStockMoves_() {
  var sh = ss_().getSheetByName('FoodStockMoves');
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out.push({ id: data[r][0], site: data[r][1], date: data[r][2], itemId: data[r][3], itemName: data[r][4], qtyIn: data[r][5], qtyOut: data[r][6], notes: data[r][7] });
  }
  return out;
}
function appendFoodStockMove_(move) {
  withScriptLock_(function () {
    var sh = getOrCreateSheet_('FoodStockMoves', FOOD_STOCK_MOVES_HEADERS);
    sh.appendRow([move.id || '', move.site || '', move.date || '', move.itemId || '', move.itemName || '', move.qtyIn || 0, move.qtyOut || 0, move.notes || '']);
  });
}
function deleteFoodStockMove_(site, id) {
  withScriptLock_(function () {
    var sh = ss_().getSheetByName('FoodStockMoves');
    if (!sh) return;
    var data = sh.getDataRange().getValues();
    for (var r = data.length - 1; r >= 1; r--) {
      if (data[r][0] === id && data[r][1] === site) { sh.deleteRow(r + 1); break; }
    }
  });
}

var STOCK_SITE_HEADERS = ['Category', 'Site', 'ItemId', 'Name', 'Colour', 'Size', 'Package', 'PriceBasis', 'BasisLabel', 'Unit', 'Qty', 'Price', 'Reorder'];
var STOCK_SITE_MOVES_HEADERS = ['Category', 'Site', 'Id', 'Date', 'ItemId', 'Content', 'QtyIn', 'QtyOut', 'Notes'];

function readStockSiteUnlocked_() {
  var sh = ss_().getSheetByName('StockSite');
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0] && !data[r][2]) continue;
    out.push({
      category: data[r][0], site: data[r][1], itemId: data[r][2], name: data[r][3], colour: data[r][4],
      size: data[r][5], package: data[r][6], priceBasis: data[r][7], basisLabel: data[r][8],
      unit: data[r][9], qty: data[r][10], price: data[r][11], reorder: data[r][12]
    });
  }
  return out;
}
function readStockSite_() {
  return withScriptLock_(function () { return readStockSiteUnlocked_(); });
}
function readStockSiteWithRev_() {
  return withScriptLock_(function () {
    return { rows: readStockSiteUnlocked_(), rev: getRevUnlocked_('StockSite') };
  });
}
function writeStockSite_(rows, expectedRev) {
  return withScriptLock_(function () {
    if (expectedRev !== undefined && expectedRev !== null && expectedRev !== '') {
      var currentRev = getRevUnlocked_('StockSite');
      if (Number(expectedRev) !== currentRev) return revConflict_(currentRev);
    }
    var sh = getOrCreateSheet_('StockSite', STOCK_SITE_HEADERS);
    clearSheetRows_('StockSite');
    if (rows.length) {
      var out = rows.map(function (r) {
        return [r.category || '', r.site || '', r.itemId || '', r.name || '', r.colour || '', r.size || '',
        r.package || '', r.priceBasis || '', r.basisLabel || '', r.unit || '', r.qty || 0, r.price || 0, r.reorder || 0];
      });
      sh.getRange(2, 1, out.length, STOCK_SITE_HEADERS.length).setValues(out);
    }
    return { ok: true, rev: bumpRevUnlocked_('StockSite') };
  });
}
function readStockSiteMoves_() {
  var sh = ss_().getSheetByName('StockSiteMoves');
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][2]) continue;
    out.push({ category: data[r][0], site: data[r][1], id: data[r][2], date: data[r][3], itemId: data[r][4], content: data[r][5], qtyIn: data[r][6], qtyOut: data[r][7], notes: data[r][8] });
  }
  return out;
}
function appendStockSiteMove_(category, site, move) {
  withScriptLock_(function () {
    var sh = getOrCreateSheet_('StockSiteMoves', STOCK_SITE_MOVES_HEADERS);
    sh.appendRow([category || '', site || '', move.id || '', move.date || '', move.itemId || '', move.content || '', move.qtyIn || 0, move.qtyOut || 0, move.notes || '']);
  });
}
function deleteStockSiteMove_(category, site, id) {
  withScriptLock_(function () {
    var sh = ss_().getSheetByName('StockSiteMoves');
    if (!sh) return;
    var data = sh.getDataRange().getValues();
    for (var r = data.length - 1; r >= 1; r--) {
      if (data[r][2] === id && data[r][0] === category && data[r][1] === site) { sh.deleteRow(r + 1); break; }
    }
  });
}
function clearStockSiteMovesForCategory_(category) {
  withScriptLock_(function () {
    var sh = ss_().getSheetByName('StockSiteMoves');
    if (!sh) return;
    var data = sh.getDataRange().getValues();
    for (var r = data.length - 1; r >= 1; r--) {
      if (!category || data[r][0] === category) sh.deleteRow(r + 1);
    }
  });
}

/* ---- Annual archive: runs once a year, cuts off at 31/12 of the prior year, backs up to Drive.
   Run installAnnualArchiveTrigger() once manually to install the schedule.
   Fires monthly but only actually archives in ARCHIVE_MONTH (default January), since Apps Script
   has no native yearly trigger.
   Vouchers, Login History, and the move/entry logs listed in ARCHIVE_TARGETS get old rows moved
   out into a yearly .xlsx in Drive. Treasury gets the same treatment but keeps a running opening
   balance per box so totals don't reset. Passports, Residence, the Desert Pass manual roster, and
   Custom Lists are current-state rosters, not logs, so they're only copied into the archive
   workbook - nothing is ever removed from those live sheets. */

var ARCHIVE_MONTH = 1;
var BACKUP_FOLDER_NAME = 'AOS ERP Annual Archives';

var TREASURY_DATE_FIELD = 'date';
var TREASURY_BALANCE_FIELD = 'balance';

var ARCHIVE_TARGETS = [
  { kind: 'columns', label: 'Vouchers',               sheetNames: function () { return allSiteSheetNames_(); },       dateColIndex: 1 },
  { kind: 'columns', label: 'Login History',          sheetNames: function () { return [LOGIN_HISTORY_SHEET_NAME]; }, dateColIndex: 4 },
  { kind: 'columns', label: 'Food Stock Moves',       sheetNames: function () { return ['FoodStockMoves']; },         dateColIndex: 2 },
  { kind: 'columns', label: 'Stock Site Moves',       sheetNames: function () { return ['StockSiteMoves']; },         dateColIndex: 3 },
  { kind: 'json',    label: 'Food Cost Log',          sheetNames: function () { return ['FoodCostLog']; },           dateField: 'date' },
  { kind: 'json',    label: 'Desert Pass (auto log)', sheetNames: function () { return ['DesertPass']; },            dateField: 'issuedDate' },
  { kind: 'json',    label: 'Desert Pass Manual Moves', sheetNames: function () { return ['DpManualMoves']; },       dateField: 'date' },
  { kind: 'json',    label: 'Site Daily Movement Log', sheetNames: function () { return ['SiteMoveLog']; },          dateField: 'date' },
  { kind: 'json',    label: 'Overtime Entries',        sheetNames: function () { return ['OvertimeEntries']; },      dateField: 'date' },
  { kind: 'json',    label: 'HR Leave',                sheetNames: function () { return ['HRLeave']; },              dateField: 'from' },
  { kind: 'json',    label: 'Outlook Drafts',          sheetNames: function () { return ['OutlookDrafts']; },        dateField: 'savedAt' },
  { kind: 'json',    label: 'Voucher Recycle Bin (restored only)', sheetNames: function () { return [VOUCHER_RECYCLE_BIN_SHEET_NAME]; }, dateField: 'restoredAt' }
];

var ARCHIVE_COPY_TARGETS = [
  { label: 'Passports',                  sheetNames: function () { return ['Passports']; } },
  { label: 'Residence',                  sheetNames: function () { return ['Residence']; } },
  { label: 'Desert Pass Manual (roster)', sheetNames: function () { return ['DpManual']; } },
  { label: 'Custom List',                sheetNames: function () { return allCustomListSheetNames_(); } }
];

function allCustomListSheetNames_() {
  return ss_().getSheets()
    .map(function (s) { return s.getName(); })
    .filter(function (name) { return name.indexOf('CL_') === 0; });
}

function parseCellDate_(v) {
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  if (v === null || v === undefined || v === '') return null;
  var d = new Date(String(v));
  return isNaN(d.getTime()) ? null : d;
}

function yearStartCutoff_(year) {
  return new Date(year, 0, 1, 0, 0, 0);
}

function archiveColumnsSheet_(sheetName, dateColIndex, cutoff) {
  var sh = ss_().getSheetByName(sheetName);
  if (!sh) return { headers: [], archivedRows: [] };
  var data = sh.getDataRange().getValues();
  if (data.length < 2) return { headers: data[0] || [], archivedRows: [] };
  var headers = data[0];
  var keep = [headers];
  var archived = [];
  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    if (!row[0]) continue;
    var d = parseCellDate_(row[dateColIndex]);
    if (d && d < cutoff) archived.push(row);
    else keep.push(row);
  }
  if (archived.length) {
    sh.clearContents();
    sh.getRange(1, 1, keep.length, headers.length).setValues(keep);
    sh.setFrozenRows(1);
  }
  return { headers: headers, archivedRows: archived };
}

function archiveJsonSheet_(sheetName, dateField, cutoff) {
  var sh = ss_().getSheetByName(sheetName);
  if (!sh) return { archivedRows: [] };
  var data = sh.getDataRange().getValues();
  if (data.length < 2) return { archivedRows: [] };
  var keepObjs = [];
  var archivedObjs = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    var obj;
    try { obj = JSON.parse(data[r][0]); } catch (e) { continue; }
    var d = parseCellDate_(obj[dateField]);
    if (d && d < cutoff) archivedObjs.push(obj);
    else keepObjs.push(obj);
  }
  if (archivedObjs.length) writeJsonRows_(sheetName, keepObjs);
  return { archivedRows: archivedObjs };
}

function archiveTreasury_(cutoff) {
  var treasury = readTreasury();
  var archivedByPath = {};
  var skipped = [];
  var changed = false;
  var newTreasury = {};

  Object.keys(treasury || {}).forEach(function (siteKey) {
    var siteVal = treasury[siteKey];
    if (!siteVal || typeof siteVal !== 'object' || Array.isArray(siteVal)) {
      newTreasury[siteKey] = siteVal;
      skipped.push(siteKey + ' (not a {boxType: [...]} object — left untouched)');
      return;
    }
    newTreasury[siteKey] = {};
    Object.keys(siteVal).forEach(function (boxKey) {
      var moves = siteVal[boxKey];
      if (!Array.isArray(moves)) {
        newTreasury[siteKey][boxKey] = moves;
        skipped.push(siteKey + ' / ' + boxKey + ' (not an array of movements — left untouched)');
        return;
      }

      var withIdx = moves.map(function (m, i) { return { m: m, i: i }; });
      withIdx.sort(function (a, b) {
        var da = parseCellDate_(a.m && a.m[TREASURY_DATE_FIELD]);
        var db = parseCellDate_(b.m && b.m[TREASURY_DATE_FIELD]);
        if (!da && !db) return a.i - b.i;
        if (!da) return -1;
        if (!db) return 1;
        return da - db;
      });

      var kept = [];
      var archived = [];
      var lastOldBalance = null;
      withIdx.forEach(function (entry) {
        var d = parseCellDate_(entry.m && entry.m[TREASURY_DATE_FIELD]);
        if (d && d < cutoff) {
          archived.push(entry.m);
          if (entry.m && entry.m[TREASURY_BALANCE_FIELD] !== undefined && entry.m[TREASURY_BALANCE_FIELD] !== null) {
            lastOldBalance = entry.m[TREASURY_BALANCE_FIELD];
          }
        } else {
          kept.push(entry.m);
        }
      });

      if (archived.length) {
        changed = true;
        archivedByPath[siteKey + ' / ' + boxKey] = archived;
        if (lastOldBalance !== null) {
          var opening = {};
          opening[TREASURY_DATE_FIELD] = Utilities.formatDate(cutoff, 'Africa/Tripoli', 'yyyy-MM-dd');
          opening[TREASURY_BALANCE_FIELD] = lastOldBalance;
          opening.isOpeningBalance = true;
          opening.notes = 'Opening balance carried forward from ' + (cutoff.getFullYear() - 1) + ' year-end archive';
          kept.unshift(opening);
        } else {
          skipped.push(siteKey + ' / ' + boxKey + ' (archived ' + archived.length + ' old movement(s) but none had a "' + TREASURY_BALANCE_FIELD + '" field to carry forward — opening balance NOT set, please check manually)');
        }
      }
      newTreasury[siteKey][boxKey] = kept;
    });
  });

  if (changed) writeTreasury(newTreasury);
  if (skipped.length) Logger.log('Treasury archive notes:\n' + skipped.join('\n'));
  return { archivedByPath: archivedByPath, changed: changed };
}

function getOrCreateBackupFolder_() {
  var folders = DriveApp.getFoldersByName(BACKUP_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(BACKUP_FOLDER_NAME);
}

function exportSpreadsheetAsXlsxBlob_(spreadsheetId, filename) {
  var url = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export?format=xlsx';
  var token = ScriptApp.getOAuthToken();
  var resp = UrlFetchApp.fetch(url, { headers: { Authorization: 'Bearer ' + token } });
  return resp.getBlob().setName(filename);
}

function copySheetSnapshot_(sheetName) {
  return readJsonRows_(sheetName);
}

function runAnnualArchive_() {
  var now = new Date();
  if (now.getMonth() + 1 !== ARCHIVE_MONTH) {
    Logger.log('Annual archive: skipped — this job only runs in month ' + ARCHIVE_MONTH + ' (current month is ' + (now.getMonth() + 1) + ').');
    return;
  }

  var cutoff = yearStartCutoff_(now.getFullYear());
  var archiveSs = SpreadsheetApp.create('AOS Archive ' + (now.getFullYear() - 1) + ' (through 31-12-' + (now.getFullYear() - 1) + ')');
  var anyArchived = false;

  ARCHIVE_TARGETS.forEach(function (target) {
    target.sheetNames().forEach(function (sheetName) {
      if (target.kind === 'columns') {
        var result = archiveColumnsSheet_(sheetName, target.dateColIndex, cutoff);
        if (result.archivedRows.length) {
          anyArchived = true;
          var tab = archiveSs.insertSheet((target.label + ' - ' + sheetName).slice(0, 90));
          var rows = [result.headers].concat(result.archivedRows);
          tab.getRange(1, 1, rows.length, result.headers.length).setValues(rows);
          tab.setFrozenRows(1);
        }
      } else {
        var jsonResult = archiveJsonSheet_(sheetName, target.dateField, cutoff);
        if (jsonResult.archivedRows.length) {
          anyArchived = true;
          var tab2 = archiveSs.insertSheet(target.label.slice(0, 90));
          tab2.getRange(1, 1, 1, 2).setValues([['Record (JSON)', 'Preview']]);
          var out = jsonResult.archivedRows.map(function (o) { return [JSON.stringify(o), previewOf_(o)]; });
          if (out.length) tab2.getRange(2, 1, out.length, 2).setValues(out);
          tab2.setFrozenRows(1);
        }
      }
    });
  });

  var treasuryResult = archiveTreasury_(cutoff);
  Object.keys(treasuryResult.archivedByPath).forEach(function (path) {
    anyArchived = true;
    var rows = treasuryResult.archivedByPath[path];
    var tab3 = archiveSs.insertSheet(('Treasury - ' + path).slice(0, 90));
    tab3.getRange(1, 1, 1, 2).setValues([['Record (JSON)', 'Preview']]);
    var out3 = rows.map(function (o) { return [JSON.stringify(o), previewOf_(o)]; });
    if (out3.length) tab3.getRange(2, 1, out3.length, 2).setValues(out3);
    tab3.setFrozenRows(1);
  });

  ARCHIVE_COPY_TARGETS.forEach(function (target) {
    target.sheetNames().forEach(function (sheetName) {
      var rows = copySheetSnapshot_(sheetName);
      if (rows.length) {
        anyArchived = true;
        var tabName = (target.label === 'Custom List') ? ('Copy - ' + sheetName) : ('Copy - ' + target.label);
        var tab4 = archiveSs.insertSheet(tabName.slice(0, 90));
        tab4.getRange(1, 1, 1, 2).setValues([['Record (JSON)', 'Preview']]);
        var out4 = rows.map(function (o) { return [JSON.stringify(o), previewOf_(o)]; });
        tab4.getRange(2, 1, out4.length, 2).setValues(out4);
        tab4.setFrozenRows(1);
      }
    });
  });

  if (!anyArchived) {
    DriveApp.getFileById(archiveSs.getId()).setTrashed(true);
    Logger.log('Annual archive: nothing dated before 1 Jan ' + now.getFullYear() + ' was found — nothing to archive this run.');
    return;
  }
  var defaultSheet = archiveSs.getSheetByName('Sheet1');
  if (defaultSheet && archiveSs.getSheets().length > 1) archiveSs.deleteSheet(defaultSheet);

  var folder = getOrCreateBackupFolder_();
  var filename = 'AOS_Archive_' + (now.getFullYear() - 1) + '.xlsx';
  var blob = exportSpreadsheetAsXlsxBlob_(archiveSs.getId(), filename);
  folder.createFile(blob);
  DriveApp.getFileById(archiveSs.getId()).setTrashed(true);

  Logger.log('Annual archive complete: ' + filename + ' saved to Drive folder "' + BACKUP_FOLDER_NAME + '".');
}

function installAnnualArchiveTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'runAnnualArchive_') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('runAnnualArchive_')
    .timeBased()
    .onMonthDay(1)
    .atHour(2)
    .create();
  Logger.log('Annual archive trigger installed — checks on the 1st of every month around 2am Africa/Tripoli time, and actually archives only in month ' + ARCHIVE_MONTH + ' (so effectively once a year).');
}

/* ---- Server-side daily encrypted email + Drive/OneDrive backup.
   Reads every sheet, serializes to JSON, encrypts with the admin-set password (AOSENC2 format:
   SHA-256 + HMAC-SHA256 counter-mode keystream, matching the browser's Web Crypto decrypt side),
   saves it to Drive, optionally uploads to OneDrive via Microsoft Graph, and emails it to the
   admin-set address(es). Toggling it on/off in Settings installs/removes the daily trigger. */

const AOSBK_PROPS = PropertiesService.getScriptProperties();
const AOSBK_TRIGGER_FN = 'aosDailyServerBackup';

function aosBk_getConfig_(){
  return {
    emails: AOSBK_PROPS.getProperty('AOSBK_EMAILS') || '',
    folderName: AOSBK_PROPS.getProperty('AOSBK_FOLDER') || 'AOS ERP Backups',
    enabled: AOSBK_PROPS.getProperty('AOSBK_ENABLED') === 'true',
    password: AOSBK_PROPS.getProperty('AOSBK_PASSWORD') || '',
    lastRunDate: AOSBK_PROPS.getProperty('AOSBK_LASTRUN_DATE') || '',
    lastRunTime: AOSBK_PROPS.getProperty('AOSBK_LASTRUN_TIME') || '',
    lastRunStatus: AOSBK_PROPS.getProperty('AOSBK_LASTRUN_STATUS') || '',
    oneDriveEnabled: AOSBK_PROPS.getProperty('AOSBK_OD_ENABLED') === 'true',
    oneDriveUser: AOSBK_PROPS.getProperty('AOSBK_OD_USER') || '',
    oneDriveFolder: AOSBK_PROPS.getProperty('AOSBK_OD_FOLDER') || 'AOS ERP Backups',
    oneDriveTenant: AOSBK_PROPS.getProperty('AOSBK_OD_TENANT') || '',
    oneDriveClientId: AOSBK_PROPS.getProperty('AOSBK_OD_CLIENTID') || '',
    oneDriveSecret: AOSBK_PROPS.getProperty('AOSBK_OD_SECRET') || ''
  };
}
function aosBk_setConfig_(patch){
  if(patch.emails !== undefined) AOSBK_PROPS.setProperty('AOSBK_EMAILS', String(patch.emails));
  if(patch.folderName !== undefined) AOSBK_PROPS.setProperty('AOSBK_FOLDER', String(patch.folderName));
  if(patch.enabled !== undefined) AOSBK_PROPS.setProperty('AOSBK_ENABLED', patch.enabled ? 'true' : 'false');
  if(patch.password !== undefined) AOSBK_PROPS.setProperty('AOSBK_PASSWORD', String(patch.password));
  if(patch.lastRunDate !== undefined) AOSBK_PROPS.setProperty('AOSBK_LASTRUN_DATE', String(patch.lastRunDate));
  if(patch.lastRunTime !== undefined) AOSBK_PROPS.setProperty('AOSBK_LASTRUN_TIME', String(patch.lastRunTime));
  if(patch.lastRunStatus !== undefined) AOSBK_PROPS.setProperty('AOSBK_LASTRUN_STATUS', String(patch.lastRunStatus));
  if(patch.oneDriveEnabled !== undefined) AOSBK_PROPS.setProperty('AOSBK_OD_ENABLED', patch.oneDriveEnabled ? 'true' : 'false');
  if(patch.oneDriveUser !== undefined) AOSBK_PROPS.setProperty('AOSBK_OD_USER', String(patch.oneDriveUser));
  if(patch.oneDriveFolder !== undefined) AOSBK_PROPS.setProperty('AOSBK_OD_FOLDER', String(patch.oneDriveFolder));
  if(patch.oneDriveTenant !== undefined) AOSBK_PROPS.setProperty('AOSBK_OD_TENANT', String(patch.oneDriveTenant));
  if(patch.oneDriveClientId !== undefined) AOSBK_PROPS.setProperty('AOSBK_OD_CLIENTID', String(patch.oneDriveClientId));
  if(patch.oneDriveSecret !== undefined) AOSBK_PROPS.setProperty('AOSBK_OD_SECRET', String(patch.oneDriveSecret));
}
function aosBk_dateStamp_(){
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Etc/UTC', 'yyyy-MM-dd');
}

function aosBk_sheetToObjects_(sheet){
  const values = sheet.getDataRange().getValues();
  if(values.length < 1) return [];
  const headers = values[0].map(function(h){ return String(h); });
  const rows = [];
  for(let r = 1; r < values.length; r++){
    const row = {};
    headers.forEach(function(h, i){ row[h || ('col' + i)] = values[r][i]; });
    rows.push(row);
  }
  return rows;
}
function aosBk_collectAllData_(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const out = {};
  ss.getSheets().forEach(function(sh){
    try{ out[sh.getName()] = aosBk_sheetToObjects_(sh); }
    catch(e){ out[sh.getName()] = { error: String(e) }; }
  });
  return out;
}

// Apps Script's Utilities functions work in Java's signed byte range, not 0-255, so every byte
// array is normalized before it touches a Utilities call and converted back for arithmetic.
function aosBk_toUnsigned_(n){ return ((n % 256) + 256) % 256; }
function aosBk_toSigned_(n){ const u = aosBk_toUnsigned_(n); return u > 127 ? u - 256 : u; }
function aosBk_randomBytes_(n){
  const arr = [];
  for(let i = 0; i < n; i++) arr.push(aosBk_toSigned_(Math.floor(Math.random() * 256)));
  return arr;
}
function aosBk_deriveKey_(password, saltBytes){
  const passBytes = Utilities.newBlob(password).getBytes();
  const combined = passBytes.concat([58]).concat(saltBytes);
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, combined);
}
function aosBk_keystream_(keyBytes, saltBytes, length){
  const out = [];
  let counter = 0;
  while(out.length < length){
    const ctr = [
      aosBk_toSigned_((counter >>> 24) & 255), aosBk_toSigned_((counter >>> 16) & 255),
      aosBk_toSigned_((counter >>> 8) & 255), aosBk_toSigned_(counter & 255)
    ];
    const block = saltBytes.concat(ctr);
    const sig = Utilities.computeHmacSha256Signature(block, keyBytes);
    for(let i = 0; i < sig.length && out.length < length; i++) out.push(sig[i]);
    counter++;
  }
  return out;
}
function aosBk_xorBytes_(aBytes, bBytes){
  const out = [];
  for(let i = 0; i < aBytes.length; i++) out.push(aosBk_toSigned_(aosBk_toUnsigned_(aBytes[i]) ^ aosBk_toUnsigned_(bBytes[i])));
  return out;
}
// "AOSENC-OK:" is prepended before encrypting so a wrong password decrypts to visibly-wrong
// bytes instead of silently handing back corrupted JSON. Must match AOSENC_MAGIC_ on the app side.
const AOSBK_MAGIC_ = [65,79,83,69,78,67,45,79,75,58];
function aosBk_decryptForSelfTest_(encryptedText, password){
  const lines = encryptedText.split('\n');
  if(lines[0] !== 'AOSENC2') throw new Error('self-test: unexpected format tag');
  const saltBytes = Array.prototype.slice.call(Utilities.base64Decode(lines[2]));
  const cipherBytes = Array.prototype.slice.call(Utilities.base64Decode(lines.slice(3).join('')));
  const keyBytes = aosBk_deriveKey_(password, saltBytes);
  const keystream = aosBk_keystream_(keyBytes, saltBytes, cipherBytes.length);
  const plainBytes = aosBk_xorBytes_(cipherBytes, keystream);
  for(let i = 0; i < AOSBK_MAGIC_.length; i++){
    if(aosBk_toUnsigned_(plainBytes[i]) !== aosBk_toUnsigned_(AOSBK_MAGIC_[i])) throw new Error('self-test: decrypt did not reproduce the original data');
  }
  return Utilities.newBlob(plainBytes.slice(AOSBK_MAGIC_.length)).getDataAsString('UTF-8');
}
function aosBk_encryptJson_(jsonText, password){
  const plainBytes = AOSBK_MAGIC_.concat(Utilities.newBlob(jsonText, 'text/plain').getBytes());
  const saltBytes = aosBk_randomBytes_(16);
  const keyBytes = aosBk_deriveKey_(password, saltBytes);
  const keystream = aosBk_keystream_(keyBytes, saltBytes, plainBytes.length);
  const cipherBytes = aosBk_xorBytes_(plainBytes, keystream);
  const encryptedText = 'AOSENC2\njson\n' + Utilities.base64Encode(saltBytes) + '\n' + Utilities.base64Encode(cipherBytes);
  const roundTrip = aosBk_decryptForSelfTest_(encryptedText, password);
  if(roundTrip !== jsonText) throw new Error('self-test: decrypted content did not match the original');
  return encryptedText;
}

function aosBk_saveAndEmail_(encryptedText, folderName, emailsCsv){
  const ts = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Etc/UTC', 'yyyy-MM-dd_HHmm');
  const filename = 'AOS-ServerBackup_' + ts + '.aosenc';
  const blob = Utilities.newBlob(encryptedText, 'text/plain', filename);

  const folders = DriveApp.getFoldersByName(folderName);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
  folder.createFile(blob);

  const emailList = String(emailsCsv || '').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
  if(emailList.length){
    MailApp.sendEmail({
      to: emailList.join(','),
      subject: 'AOS ERP — daily encrypted backup (' + ts + ')',
      body: 'Attached is today\'s encrypted backup file (' + filename + ').\n\n' +
            'It requires the backup password to open — decrypt it from inside the app under ' +
            'Settings > Device Backup > "Restore from an encrypted backup file".',
      attachments: [blob]
    });
  }
  return filename;
}

// Needs an Azure App Registration with a Files.ReadWrite.All application permission,
// admin-consented, since a server timer can't sign a user in the way the browser button does.
function aosBk_getGraphToken_(cfg){
  const url = 'https://login.microsoftonline.com/' + encodeURIComponent(cfg.oneDriveTenant) + '/oauth2/v2.0/token';
  const res = UrlFetchApp.fetch(url, {
    method: 'post',
    payload: {
      client_id: cfg.oneDriveClientId,
      client_secret: cfg.oneDriveSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials'
    },
    muteHttpExceptions: true
  });
  const data = JSON.parse(res.getContentText());
  if(!data.access_token) throw new Error('Microsoft sign-in failed: ' + (data.error_description || res.getContentText()));
  return data.access_token;
}
function aosBk_uploadToOneDrive_(cfg, filename, encryptedText){
  const token = aosBk_getGraphToken_(cfg);
  const path = encodeURIComponent(cfg.oneDriveFolder || 'AOS ERP Backups') + '/' + encodeURIComponent(filename);
  const url = 'https://graph.microsoft.com/v1.0/users/' + encodeURIComponent(cfg.oneDriveUser) + '/drive/root:/' + path + ':/content';
  const res = UrlFetchApp.fetch(url, {
    method: 'put',
    contentType: 'text/plain',
    payload: encryptedText,
    headers: { Authorization: 'Bearer ' + token },
    muteHttpExceptions: true
  });
  if(res.getResponseCode() >= 300) throw new Error('OneDrive upload failed (HTTP ' + res.getResponseCode() + '): ' + res.getContentText());
}

function aosBk_runBackup_(){
  const cfg = aosBk_getConfig_();
  if(!cfg.enabled) return { skipped: true, reason: 'Backup is turned off in Settings.' };
  if(!cfg.password) return { skipped: true, reason: 'No backup password has been set yet.' };
  try{
    const dataObj = aosBk_collectAllData_();
    const jsonText = JSON.stringify({ app: 'AOS ERP', schemaVersion: 1, exportedAt: new Date().toISOString(), data: dataObj });
    const encrypted = aosBk_encryptJson_(jsonText, cfg.password);
    const filename = aosBk_saveAndEmail_(encrypted, cfg.folderName, cfg.emails);
    let status = 'OK: ' + filename;
    if(cfg.oneDriveEnabled){
      try{ aosBk_uploadToOneDrive_(cfg, filename, encrypted); status += ' + OneDrive OK'; }
      catch(e){ status += ' + OneDrive FAILED: ' + e.message; }
    }
    aosBk_setConfig_({ lastRunDate: aosBk_dateStamp_(), lastRunTime: new Date().toLocaleTimeString(), lastRunStatus: status });
    return { ok: true, filename: filename };
  }catch(e){
    aosBk_setConfig_({ lastRunDate: aosBk_dateStamp_(), lastRunTime: new Date().toLocaleTimeString(), lastRunStatus: 'FAILED: ' + e.message });
    return { error: e.message };
  }
}

function aosDailyServerBackup(){
  aosBk_runBackup_();
}

function aosBk_installDailyTrigger_(){
  aosBk_removeDailyTrigger_();
  ScriptApp.newTrigger(AOSBK_TRIGGER_FN).timeBased().everyDays(1).atHour(2).create();
}
function aosBk_removeDailyTrigger_(){
  ScriptApp.getProjectTriggers().forEach(function(t){
    if(t.getHandlerFunction() === AOSBK_TRIGGER_FN) ScriptApp.deleteTrigger(t);
  });
}

function aosBkOnGetConfig_(){
  const cfg = aosBk_getConfig_();
  return {
    emails: cfg.emails,
    folderName: cfg.folderName,
    enabled: cfg.enabled,
    hasPassword: !!cfg.password,
    lastRun: { date: cfg.lastRunDate, time: cfg.lastRunTime, status: cfg.lastRunStatus },
    oneDriveEnabled: cfg.oneDriveEnabled,
    oneDriveUser: cfg.oneDriveUser,
    oneDriveFolder: cfg.oneDriveFolder,
    oneDriveTenant: cfg.oneDriveTenant,
    oneDriveClientId: cfg.oneDriveClientId,
    hasOneDriveSecret: !!cfg.oneDriveSecret
  };
}
function aosBkOnSetConfig_(payload){
  // TODO: plug in an admin-password check here before this ships, e.g.
  //   if(!isRequestFromAdmin_(payload)) return { error: 'Not authorized' };

  const patch = {
    emails: String((payload && payload.emails) || ''),
    folderName: String((payload && payload.folderName) || 'AOS ERP Backups'),
    enabled: !!(payload && payload.enabled),
    oneDriveEnabled: !!(payload && payload.oneDriveEnabled),
    oneDriveUser: String((payload && payload.oneDriveUser) || ''),
    oneDriveFolder: String((payload && payload.oneDriveFolder) || 'AOS ERP Backups'),
    oneDriveTenant: String((payload && payload.oneDriveTenant) || ''),
    oneDriveClientId: String((payload && payload.oneDriveClientId) || '')
  };
  if(payload && payload.changePassword && payload.password) patch.password = String(payload.password);
  if(payload && payload.changeOneDriveSecret && payload.oneDriveSecret) patch.oneDriveSecret = String(payload.oneDriveSecret);
  aosBk_setConfig_(patch);

  if(patch.enabled) aosBk_installDailyTrigger_();
  else aosBk_removeDailyTrigger_();

  return { ok: true };
}
function aosBkOnRunNow_(payload){
  // TODO: same admin check as aosBkOnSetConfig_ above.
  var result = aosBk_runBackup_();
  if (result && result.error) return { ok: false, error: result.error };
  if (result && result.skipped) return { ok: true, skipped: true, reason: result.reason };
  return result;
}

/* ---- Auto-delete old Voucher PDFs (Drive), runs monthly. Files are trashed (30-day recycle
   bin), not permanently destroyed, so an early cutoff is still recoverable for a month. */

var PDF_RETENTION_MONTHS = 3;

function pdfFolder_() {
  var folders = DriveApp.getFoldersByName(PDF_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : null;
}

function deleteOldVoucherPdfs_() {
  return withScriptLock_(function () {
    var folder = pdfFolder_();
    if (!folder) return { ok: true, deleted: 0, note: 'PDF folder does not exist yet — nothing to clean.' };

    var cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - PDF_RETENTION_MONTHS);

    var files = folder.getFiles();
    var deleted = 0, kept = 0;
    var deletedNames = [];
    while (files.hasNext()) {
      var f = files.next();
      if (f.getDateCreated() < cutoff) {
        deletedNames.push(f.getName());
        f.setTrashed(true);
        deleted++;
      } else {
        kept++;
      }
    }

    var summary = 'PDF cleanup: trashed ' + deleted + ' file(s) older than ' + PDF_RETENTION_MONTHS + ' month(s), kept ' + kept + '.';
    Logger.log(summary + (deletedNames.length ? ('\n' + deletedNames.join('\n')) : ''));
    return { ok: true, deleted: deleted, kept: kept };
  });
}

function installPdfCleanupTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'deleteOldVoucherPdfs_') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('deleteOldVoucherPdfs_')
    .timeBased()
    .onMonthDay(1)
    .atHour(3)
    .create();
  Logger.log('PDF cleanup trigger installed — runs on the 1st of every month around 3am, deleting voucher PDFs older than ' + PDF_RETENTION_MONTHS + ' months.');
}
