export class DrlRequestContractInfoListModel {
  userId: number;
  unitId: number;

  contractNumber: string;
  mainEconomicPart: number;
  isicEconomicPart: number;
  contractType: number = 0;
  /**
   * عنوان قرارداد
   */
  contractTypeDsc: string;
  pureAmount: number;
  /**
   * مبلغ سود قرارداد
   */
  intrstAmnt: number;
  /**
   * نرخ سود قرارداد
   */
  intrstRate: number;
  etaDate: number;
  /**
   * تعداد اقساط
   */
  gstCnt: number;
  /**
   * فاصله اقساط
   */
  gstSpace: number;
  /**
   * مجموع بدعی کل
   */
  totalRemainAmnt: number;
  /**
   * مانده بدهی اصل
   */
  pureRemainAmnt: number;
  /**
   * مانده بدهی سود
   */
  intrstRemainAmnt: number;
  /**
   * مانده بدهی کل جریمه
   */
  totalJarRemainAmnt: number;
  /**
   * مانده بدهی سود پس از سررسید
   */
  jarRemainAmntIntrstRate: number;
  /**
   * مانده بدهی نرخ مازاد جریمه بر نرخ سود
   */
  jarRemainAmntExtra: number;
  /**
   * مانده بدهی هزینه ها
   */
  costRemainAmnt: number;
  emhalCnt: number;
  /**
   * توضیحات
   */
  description: string;
}
