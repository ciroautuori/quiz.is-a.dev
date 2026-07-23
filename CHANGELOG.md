# Changelog

Tutte le modifiche significative a questo progetto sono documentate in questo file.

## [1.0.0] - 2026-07-21

### Aggiunto

- **Gioco educativo completo** per imparare Python da principianti
- **Modalità Gioca** con quiz a risposta multipla
  - Sistema di punteggio (10/15/20 punti per difficoltà)
  - Sistema di vite (3 vite iniziali)
  - Suggerimenti opzionali (riducono punti a metà)
  - Comando 'q' per uscire dalla partita
  - Salvataggio punteggi locale
- **Modalità Impara** con 24+ concetti Python
  - Spiegazioni brevi e chiare
  - Copertura argomenti base e avanzati
- **Modalità Punteggi** con classifica top 10
- **Modalità Crediti** con attribuzioni complete

- **Banca domande** con 60+ sfide
  - 20+ domande facili
  - 25+ domande medie
  - 15+ domande difficili
  - 12+ domande su errori/debug
  - Copertura completa: print, variabili, funzioni, condizioni, cicli, stringhe, liste, dizionari, tuple, classi, errori

- **Interfaccia CLI** completa
  - `--version` per versione
  - `--self-test` per validazione
  - `--gioca` per partita diretta
  - `--domande N` per numero domande
  - `--difficolta` per selezione difficoltà
  - `--seed N` per riproducibilità
  - `--no-salvataggio` per disabilitare salvataggio
  - `--percorso-dati` per override directory dati
  - `--nome` per nome giocatore
  - `--debug` per traceback errori

- **Sistema di storage** JSON
  - Salvataggio in `~/.python_quest/punteggi.json`
  - Scrittura atomica
  - Recupero da file corrotti
  - Sanitizzazione input utente

- **Validazione contenuti**
  - Controllo sintassi snippet Python
  - Verifica univocità ID
  - Controllo campi obbligatori
  - Scan sicurezza (no eval/exec/subprocess)

- **Test suite** completa
  - Test modelli dati
  - Test logica gioco
  - Test domande e concetti
  - Test storage
  - Test validazione
  - Test CLI
  - Test interfaccia utente
  - Test sicurezza

- **Script di verifica**
  - `valida_domande.py` per validazione contenuti
  - `smoke_test.py` per test end-to-end
  - `verify.py` per esecuzione completa

- **Documentazione** completa
  - README.md con guida all'uso
  - ATTRIBUTION.md con crediti
  - LICENSE_NOTICE.md con dettagli licenze
  - HANDOFF.md con note di consegna

- **CI/CD** con GitHub Actions
  - Workflow tests.yml per Ubuntu
  - Esecuzione automatica test

### Specifiche Tecniche

- Python 3.10+
- Solo standard library
- Nessuna dipendenza esterna
- Compatibile Windows, macOS, Linux
- UTF-8 encoding
- Nessun uso di eval/exec su input utente
- Nessun subprocess nel runtime
- Nessuna connessione di rete

### Licenze

- Codice: MIT License
- Contenuti educativi: CC BY-NC 4.0
- Documentazione: CC BY-NC 4.0

---

## Note

Formato data: YYYY-MM-DD  
Ispirato a [Keep a Changelog](https://keepachangelog.com/it/).
