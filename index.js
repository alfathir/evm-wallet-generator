// Coding: utf-8
const bip39 = require("bip39");
const wutils = require("ethereum-mnemonic-privatekey-utils");
const pk = require("ethereum-private-key-to-address");
const xlsx = require("xlsx");
const rl = require("readline-sync");
const clear = require("clear");

const generateAccount = () => {
  let mnemonic = bip39.generateMnemonic();
  let privatekey = "0x" + wutils.getPrivateKeyFromMnemonic(mnemonic);
  let address = pk(privatekey);

  return {
    mnemonic: mnemonic,
    privatekey: privatekey,
    address: address,
  };
};

const savetoxlsx = (accountList, filename) => {
  let workbook = xlsx.utils.book_new();
  let res = xlsx.utils.aoa_to_sheet(accountList);
  xlsx.utils.book_append_sheet(workbook, res, "Account List");
  xlsx.writeFile(workbook, `${filename}.xlsx`);
};

const main = (amount, filename) => {
  var accountList = [];
  accountList.push(["Address", "PrivateKey", "Mnemonic"]);
  for (let i = 1; i <= amount; i++) {
    let acc = generateAccount();
    console.log(
      `[+] Address : ${acc.address}\n[+] Private Key : ${acc.privatekey}\n[+] Mnemonic : ${acc.mnemonic}\n`
    );
    accountList.push([acc.address, acc.privatekey, acc.mnemonic]);
  }
  if (filename != "") {
    savetoxlsx(accountList, filename);
  }
};

clear();
console.log(
  `
  ╔═══╦╗──╔╦═╗╔═╗────────╔╗╔╗───╔╗
  ║╔══╣╚╗╔╝║║╚╝║║────────║║║║──╔╝╚╗
  ║╚══╬╗║║╔╣╔╗╔╗║╔╗╔╗╔╦══╣║║║╔═╩╗╔╝╔══╦══╦═╗
  ║╔══╝║╚╝║║║║║║║║╚╝╚╝║╔╗║║║║║║═╣║─║╔╗║║═╣╔╗╗
  ║╚══╗╚╗╔╝║║║║║║╚╗╔╗╔╣╔╗║╚╣╚╣║═╣╚╗║╚╝║║═╣║║╠╗
  ╚═══╝─╚╝─╚╝╚╝╚╝─╚╝╚╝╚╝╚╩═╩═╩══╩═╝╚═╗╠══╩╝╚╩╝
  ─────────────────────────────────╔═╝║
  ─────────────────────────────────╚══╝
  `
);
console.log(
  `
  Github : https://github.com/alfathir
  Facebook : https://facebook.com/habib.alfathir.54
  WhatsApp : https://wa.me/6285270371952
  Telegram : https://t.me/fathiral27\n
  `
);
var opt = {};
opt.amount = rl.questionInt(
  "[?] Enter the number of wallets to be generated : "
);
opt.filename = rl.question(
  "[?] Enter the file name if the result will be saved in the xlsx file (leave it empty if you don't want to save) : "
);
console.log(`\n\n`);
main(opt.amount, opt.filename);
