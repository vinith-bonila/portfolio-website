import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, Check, Mail, ExternalLink, Copy } from 'lucide-react'
import { contact } from '../data/portfolio'

type Errors = { name?: string; email?: string; message?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Static contact form — no backend. After validation it lets the visitor
 * choose where to compose (Gmail, Outlook, or their default mail app), so
 * they're never dumped into an app they don't use. Copy is the last resort.
 */
export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [showChoices, setShowChoices] = useState(false)
  const [copied, setCopied] = useState(false)

  const validate = (): Errors => {
    const e: Errors = {}
    if (!name.trim()) e.name = 'Please enter your name'
    if (!email.trim()) e.email = 'Please enter your email'
    else if (!EMAIL_RE.test(email.trim())) e.email = 'That email looks off'
    if (!message.trim()) e.message = 'Write a short message'
    return e
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) {
      setShowChoices(false)
      return
    }
    setShowChoices(true)
  }

  // Compose fields (rebuilt on each open so edits are always reflected)
  const subject = `Let's connect, Vinith — from ${name.trim()}`
  const body =
    `Hi Vinith,\n\n` +
    `${message.trim()}\n\n` +
    `Best,\n${name.trim()}\n${email.trim()}\n\n` +
    `— — —\nSent from your portfolio · replies welcome`
  const to = contact.email
  const encSub = encodeURIComponent(subject)
  const encBody = encodeURIComponent(body)

  const openGmail = () =>
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encSub}&body=${encBody}`,
      '_blank',
      'noopener,noreferrer',
    )

  const openOutlook = () =>
    window.open(
      `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${encSub}&body=${encBody}`,
      '_blank',
      'noopener,noreferrer',
    )

  const openDefault = () => {
    window.location.href = `mailto:${to}?subject=${encSub}&body=${encBody}`
  }

  const copyMessage = async () => {
    const text = `To: ${to}\nSubject: ${subject}\n\n${body}`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearError = (key: keyof Errors) => {
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
    if (showChoices) setShowChoices(false)
  }

  const fieldClass = (hasError?: string) =>
    `w-full rounded-xl border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-accent ${
      hasError ? 'border-red-400/60' : 'border-[var(--hairline)]'
    }`

  const choiceClass =
    'inline-flex items-center gap-2 rounded-xl border border-[var(--hairline)] bg-[var(--bg)] px-4 py-2.5 font-mono text-sm text-[var(--text)] transition-colors hover:border-accent hover:text-accent'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] p-6 md:p-8"
      aria-label="Contact form"
    >
      <div className="font-mono text-[10px] uppercase tracking-label text-accent">
        Send a message
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cf-name"
            className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted"
          >
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              clearError('name')
            }}
            placeholder="Jane Doe"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
            className={fieldClass(errors.name)}
          />
          {errors.name && (
            <p id="cf-name-err" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cf-email"
            className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted"
          >
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clearError('email')
            }}
            placeholder="jane@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
            className={fieldClass(errors.email)}
          />
          {errors.email && (
            <p id="cf-email-err" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="cf-message"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted"
        >
          Message
        </label>
        <textarea
          id="cf-message"
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            clearError('message')
          }}
          placeholder="Hi Vinith — we're hiring for a Data Analyst role and your DocMind project caught our eye…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          className={`${fieldClass(errors.message)} resize-y`}
        />
        {errors.message && (
          <p id="cf-message-err" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-ink-950 transition-shadow hover:shadow-[0_0_28px_-6px_rgba(45,226,197,0.6)]"
      >
        <Send size={16} />
        Send message
      </button>

      {/* App picker — revealed after a valid submit */}
      <AnimatePresence initial={false}>
        {showChoices && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-6 rounded-xl border border-[var(--hairline)] bg-[var(--bg)] p-5">
              <div className="font-mono text-[10px] uppercase tracking-label text-muted">
                Open your message in
              </div>
              <div
                className="mt-3 flex flex-wrap gap-2.5"
                role="group"
                aria-label="Choose where to compose your email"
              >
                <button type="button" onClick={openGmail} className={choiceClass}>
                  <Mail size={15} />
                  Gmail
                  <ExternalLink size={13} className="opacity-50" />
                </button>
                <button
                  type="button"
                  onClick={openOutlook}
                  className={choiceClass}
                >
                  <Mail size={15} />
                  Outlook
                  <ExternalLink size={13} className="opacity-50" />
                </button>
                <button
                  type="button"
                  onClick={openDefault}
                  className={choiceClass}
                >
                  <Mail size={15} />
                  Default mail app
                </button>
                <button
                  type="button"
                  onClick={copyMessage}
                  className={choiceClass}
                >
                  {copied ? (
                    <>
                      <Check size={15} className="text-accent" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      Copy message
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 font-mono text-[11px] text-muted">
                Gmail &amp; Outlook open in a new tab, pre-filled. Nothing sends
                until you hit send there.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
