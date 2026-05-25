import { BorderGlow, CARD_COLORS } from './BorderGlow'
import { useLanguage } from '../i18n/LanguageContext'

export function WhatIDo() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">
        {t.whatIDo.heading}
      </h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {t.whatIDo.services.map((service, index) => (
          <BorderGlow
            key={service.title}
            animated
            animateOnView
            animateOnHover
            animationDelay={index * 300}
            interactive={false}
            colors={CARD_COLORS[index % CARD_COLORS.length]}
            glowColor="250 70% 75%"
            backgroundColor="rgba(10, 10, 15, 0.88)"
            borderRadius={20}
            glowRadius={36}
            fillOpacity={0.45}
            className="min-h-[160px]"
          >
            <div className="flex h-full items-center justify-center p-6">
              <h3 className="text-center text-lg font-semibold text-white">
                {service.title}
              </h3>
            </div>
          </BorderGlow>
        ))}
      </div>
    </section>
  )
}
