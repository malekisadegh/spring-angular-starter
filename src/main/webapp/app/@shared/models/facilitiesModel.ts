export class FacilitiesModel {
  /**
   * شماره تسهیلات
   */
  facilitiesNumber: string;
  /**
   * کد ملی/ شناسه ملی مدیون
   */
  nationalNumberDebtor: string;
  /**
   * نام و نام خانوادگی مدیون
   */
  fullNameDebtor: string;
  /**
   * شماره همراه مشتری
   */
  customerMobileNumber: string;
  /**
   * حساب مشتری مربوط به قرارداد
   */
  customerAccountRelatedToCollateral: String;
  /**
   * کد شعبه
   */
  branchCode: string;
  /**
   * نوع عقد
   */
  contractType: string;
  /**
   * کد قرارداد
   */
  collateralCode: string;
  /**
   * نوع محصول
   */
  productType: string;
  /**
   * کد محصول
   */
  productCode: string;
  /**
   * منبع پرداخت تسهیلات
   */
  facilitiesPaymentSource: string;
  /**
   * شماره پیگیری بانک مرکزی
   */
  trackingNumberCentralBank: string;
  /**
   * مبلغ اصل تسهیلات
   */
  facilitiesOriginalAmount: string;
  /**
   * مبلغ سود  تسهیلات
   */
  facilitiesPercentAmount: string;
  /**
   * تاریخ اعطای وام
   */
  loanHistory: string;
  /**
   * تعداد اقساط
   */
  installmentNumber: string;
  /**
   * فاصله اقساط
   */
  installmentDuration: string;
  /**
   * نرخ سود
   */
  interestRate: string;
  /**
   * نرخ سود تعهد دولت
   */
  interestRateGovernmentCommitment: string;
  /**
   * نرخ وجه التزام
   */
  commitmentRate: string;
  /**
   * مانده بدهی کل
   */
  totalDebtBalance: string;
  /**
   * مانده اصل
   */
  originalRemains: string;
  /**
   * مانده سود
   */
  profitBalance: string;
  /**
   * مانده وجه التزام
   */
  remainingObligation: string;
  /**
   * مانده هزینه قضایی/قانونی
   */
  legalCostBalance_Judiciary: string;
  /**
   * مچموع پرداختی های مشتری
   */
  totalCustomerPayments: string;
  /**
   * پرداختی اصل مشتری
   */
  paymentOfCustomerPrinciple: string;
  /**
   * پرداختی سود مشتری
   */
  payCustomerBenefits: string;
  /**
   * پرداختی وجه التزام مشتری
   */
  paymentOfCustomerCommitment: string;
  /**
   * پرداختی هزینه قضایی/قانونی
   */
  legalPayments_Judiciary: string;
  /**
   * پرداختی های سهم دولت
   */
  governmentsPayments: string;
  /**
   * تاریخ اولین بدهی ایجاد شده
   */
  firstDebtCreatedDate: string;
  /**
   * تاریخ آخرین پرداختی مشتری
   */
  lastDebtCreatedDate: string;
  /**
   * تاریخ قسط اول
   */
  firstInstallmentDate: string;
  /**
   * تاریخ قسط اخر
   */
  lastInstallmentDate: string;
  /**
   * مبلغ مبالغ تخفیف به مشتری
   */
  customerDiscountAmount: string;
}
