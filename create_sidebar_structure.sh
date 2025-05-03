#!/bin/bash

# تعریف آرایه پوشه‌ها و فایل‌ها
declare -A menu_structure=(
  ["Dashboard"]="Dashboard.js"
  ["Customers"]="NewCustomer.js CustomerList.js Receipts.js Payments.js Shareholders.js Vendors.js"
  ["Products"]="NewProduct.js NewService.js ProductList.js PriceUpdate.js BarcodePrint.js BulkBarcodePrint.js PriceList.js"
  ["Banking"]="Banks.js Funds.js PettyCash.js Transfers.js TransferList.js ReceivedCheques.js PaidCheques.js"
  ["Sales"]="NewSale.js QuickInvoice.js SaleReturns.js SalesInvoices.js ReturnInvoices.js Income.js IncomeList.js InstallmentContracts.js InstallmentSales.js DiscountItems.js"
  ["Purchases"]="NewPurchase.js PurchaseReturns.js PurchaseInvoices.js ReturnPurchaseInvoices.js Expenses.js ExpenseList.js Waste.js WasteList.js"
  ["Inventory"]="Warehouses.js NewTransfer.js InventoryReceipts.js Stock.js AllWarehouses.js InventoryAudit.js"
  ["Accounting"]="NewDocument.js DocumentList.js OpeningBalance.js CloseFiscalYear.js AccountTable.js ConsolidatedDocuments.js"
  ["Others"]="Archive.js SMSPanel.js Inquiry.js MiscellaneousReceipts.js MiscellaneousPayments.js CurrencyAdjustment.js PersonBalance.js ProductBalance.js Payroll.js"
  ["Reports"]="Reports.js"
  ["Settings"]="Settings.js"
)

# ایجاد پوشه‌ها و فایل‌ها
for folder in "${!menu_structure[@]}"; do
  # ایجاد پوشه
  mkdir -p "./src/pages/$folder"

  # ایجاد فایل‌ها در پوشه
  for file in ${menu_structure[$folder]}; do
    touch "./src/pages/$folder/$file"
    echo "// This is the $file file for the $folder module" > "./src/pages/$folder/$file"
  done
done

# پیام موفقیت
echo "ساختار منوها و فایل‌ها با موفقیت ایجاد شد."