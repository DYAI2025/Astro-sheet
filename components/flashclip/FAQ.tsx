import { useState } from 'react'

const faqs = [
  {
    question: 'Does FlashClip upload my files anywhere?',
    answer: 'No. All files are saved directly to your Downloads folder. FlashClip never sends data to external servers.',
  },
  {
    question: 'What formats can I export?',
    answer:
      'FlashClip supports 15+ formats including TXT, JSON, Python, TypeScript, Markdown (.md), SQL, CSV, CSS, Shell (.sh), XML, YAML, PDF and DOCX.',
  },
  {
    question: 'Can I use it offline?',
    answer: 'Yes. The core workflow works offline because saving is local-first.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-forest-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">FAQ</h2>
          <p className="text-lg text-slate-200/80">Quick answers, privacy-first.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index
            return (
              <div key={faq.question} className="glass-card overflow-hidden">
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="font-semibold text-slate-50">{faq.question}</span>
                  <span className="text-gold-400" aria-hidden="true">
                    {open ? '–' : '+'}
                  </span>
                </button>

                {open && <div className="px-6 pb-6 text-slate-200/80">{faq.answer}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
