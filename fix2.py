import re
with open("components/Navbar.tsx", "r") as f:
    c = f.read()
c = c.replace(r"\'", "'")
with open("components/Navbar.tsx", "w") as f:
    f.write(c)

for file in ["components/GameMode.tsx", "components/CommunityHubView.tsx", "components/MobileBottomNav.tsx", "components/SkillTreeView.tsx"]:
    with open(file, "r") as f:
        c = f.read()
    c = c.replace(r"\'", "'")
    with open(file, "w") as f:
        f.write(c)

with open("components/AnalyticsDashboardModal.tsx", "r") as f:
    c = f.read()
c = c.replace("""            {!stats && (
              <div className="p-8 text-center ctp-card border border-[var(--ctp-surface1)] rounded-2xl w-full h-full flex flex-col items-center justify-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-[var(--ctp-text)] mb-2">Dati non disponibili</h3>
                <p className="text-sm text-[var(--ctp-subtext0)]">Gioca qualche partita per generare le tue statistiche.</p>
              </div>
            )}
            {stats && (

            {/* KPI Metrics */}""", """            {!stats && (
              <div className="p-8 text-center ctp-card border border-[var(--ctp-surface1)] rounded-2xl w-full h-full flex flex-col items-center justify-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-[var(--ctp-text)] mb-2">Dati non disponibili</h3>
                <p className="text-sm text-[var(--ctp-subtext0)]">Gioca qualche partita per generare le tue statistiche.</p>
              </div>
            )}
            {stats && (
              <>
            {/* KPI Metrics */}""")
c = c.replace("""            {/* Smart Review Recommendation */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-amber-200">Consiglio Personalizzato dell'AI Tutor:</strong>
                Hai un'eccellente precisione nella sintassi base (92%), ma ti consigliamo di allenare maggiormente la sezione <em>"Async & Decoratori"</em> e <em>"OOP"</em>.
              </div>
            </div>
            )}""", """            {/* Smart Review Recommendation */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-amber-200">Consiglio Personalizzato dell'AI Tutor:</strong>
                Hai un'eccellente precisione nella sintassi base (92%), ma ti consigliamo di allenare maggiormente la sezione <em>"Async & Decoratori"</em> e <em>"OOP"</em>.
              </div>
            </div>
            </>
            )}""")

with open("components/AnalyticsDashboardModal.tsx", "w") as f:
    f.write(c)
