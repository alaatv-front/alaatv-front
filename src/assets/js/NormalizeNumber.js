export default class NormalizeNumber {
  static e2p (s) { return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) }
  static e2a (s) { return s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]) }

  static p2e (s) { return s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)) }
  static a2e (s) { return s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)) }

  static p2a (s) { return s.replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]) }
  static a2p (s) { return s.replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]) }

  static toEnglish (s) {
    return NormalizeNumber.a2e(NormalizeNumber.p2e(s))
  }

  static toPersian (s) {
    return NormalizeNumber.a2p(NormalizeNumber.e2p(s))
  }

  static toArabic (s) {
    return NormalizeNumber.e2a(NormalizeNumber.p2a(s))
  }
}
