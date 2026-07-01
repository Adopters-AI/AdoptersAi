const samples = [
  "الذكاء الاصطناعي",
  "سيادي · فعلي · داخلي",
  "نُمكّن المؤسسات من تنفيذ حلول الذكاء الاصطناعي",
  "هندسة الذكاء الاصطناعي وعمليات التشغيل"
];

const weights = [400, 700, 800] as const;
const sizes = [14, 18, 28, 48] as const;

function FontColumn({ patched }: { patched: boolean }) {
  return (
    <section
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
      style={{ fontFamily: patched ? "var(--font-arabic)" : "var(--font-arabic-original)" }}
    >
      <h2 className="text-2xl font-bold text-white">{patched ? "Almarai المعدّل" : "Almarai الأصلي"}</h2>
      <p className="mt-2 text-sm text-[#a7bdb6]">
        {patched ? "مقاييس نزول موسّعة" : "ملفات Google Fonts الأصلية"}
      </p>

      <div className="mt-8 space-y-8">
        {weights.map((weight) => (
          <div className="space-y-4" key={weight}>
            <p className="text-xs text-[#25d99d]">وزن {weight}</p>
            {sizes.map((size, index) => (
              <p
                className="border-b border-white/10 pb-3 text-white"
                key={size}
                style={{ fontSize: size, fontWeight: weight, lineHeight: 1.5 }}
              >
                {samples[index]}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-amber-400/40 bg-black/20 p-3">
        <p className="text-xs text-amber-300">اختبار حاوية overflow-hidden</p>
        <p className="mt-2 text-[32px] font-bold leading-[1.1] text-white">الذكاء الاصطناعي</p>
      </div>
    </section>
  );
}

export default function FontTestPage() {
  return (
    <main className="min-h-screen bg-[#031915] px-5 py-12 text-white" dir="rtl" lang="ar">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="text-4xl font-bold">اختبار Almarai: الأصلي مقابل المعدّل</h1>
        <p className="mt-4 max-w-[850px] text-base text-[#a7bdb6]">
          افحص النقطتين أسفل حرف الياء الأخير في كلمات مثل «الاصطناعي» على الجهاز والمتصفح المتأثرين، وبمستويات تكبير مختلفة.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <FontColumn patched={false} />
          <FontColumn patched />
        </div>
      </div>
    </main>
  );
}
