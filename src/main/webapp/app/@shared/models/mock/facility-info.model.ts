import { CollateralDocumentModel } from '@shared/models/collateral/collateral-document.model';
import { EconomicSectionModel } from '@shared/models/collateral/economic-section.model';

export class FacilityInfoModel {
  customerId: string;
  customerCode: string;

  /**
   * Economic
   */
  mainEconomicPart: EconomicSectionModel;
  isicEconomicPart: EconomicSectionModel;
  isicSubEconomicPart: EconomicSectionModel;

  /**
   * شناسه قرارداد
   */
  contractId: number;
  /**
   * شماره تسهیلات
   */
  facilityNumber: string;
  /**
   * نام و نام خانوادگی مدیون
   */
  debtorFullName: string;
  /**
   * نام شعبه
   */
  branchName: string;
  /**
   * کد شعبه
   */
  branchCode: number;
  /**
   * نام سرپرستی
   */
  supervisionName: string;
  /**
   * نوع قرارداد
   */
  contractType: string;
  /**
   * کد قرارداد
   */
  contractCode: number;
  /**
   * مبلغ وام
   */
  facilityAmount: number;
  /**
   * تاریخ اعطای وام
   */
  facilityGrantDate: string;
  /**
   * تعداد اقساط
   */
  installmentNumber: number;
  paymentDeadLinePerMonth: number;

  /**
   * کد وثیقه
   */
  facilityCode: string;
  /**
   * مبلغ معوق
   */
  deferred: number;
  /**
   * مبلغ جریمه
   */
  penalty: number;
  /**
   * مانده بدهی کل
   */
  remainingDebtTotal: number;
  /**
   * مانده بدهی بر اساس اصل
   */
  remainingDebtBasedPrinciple: number;
  /**
   * مانده بدهی بر اساس سود
   */
  remainingDebtBasedProfit: number;
  /**
   * مانده بدهی بر اساس وجه التزام
   */
  remainingDebtBasedCommitment: number;
  /**
   * دفعات امهال
   */
  deadLineNumber: number;

  /**
   * نرخ سود قرارداد
   */
  contractRateInterest: number;
  contractRateAmount: number;

  /**
   * اقدامات انجام شده بر روی وثیقه ها
   */
  actionDoneOnCollateral: string;
  /**
   * تلفن همراه
   */
  mobile: string;
  /**
   * توضیحات
   */
  details: string;

  /**
   * تاریخ اعطا
   */
  grantedDate: number;
  description: string;

  intrstRemainAmnt: number;
  jarRemainAmntIntrstRate: number;
  jarRemainAmntExtra: number;

  /**
   * local Object
   */
  documentAttach: CollateralDocumentModel[];
}
