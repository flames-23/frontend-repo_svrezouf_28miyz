import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Wand2, Star, Sparkles, PackageOpen, X, Trash2 } from 'lucide-react'
import Spline from '@splinetool/react-spline'

// Brand palette
const BRAND = {
  violet: 'rgb(86, 11, 173)', // Deep Violet
  royal: 'rgb(114, 9, 183)', // Royal Purple
  pink: 'rgb(247, 37, 133)', // Hot Pink
  gold: 'rgb(253, 197, 0)', // Golden Yellow
  yellow: 'rgb(255, 213, 0)', // Bright Yellow
}

const PRODUCTS = [
  { id: 'calendar', name: 'Enchanted Desk Calendar', price: 18, color: BRAND.violet, accent: BRAND.gold, emoji: '📅' },
  { id: 'planner', name: 'Time-Turner Planner', price: 22, color: BRAND.royal, accent: BRAND.yellow, emoji: '📔' },
  { id: 'journals', name: 'Whispering Journal', price: 16, color: BRAND.pink, accent: BRAND.gold, emoji: '📓' },
  { id: 'notebooks', name: 'Spellbound Notebook', price: 12, color: BRAND.violet, accent: BRAND.pink, emoji: '📒' },
  { id: 'stickies', name: 'Pixie Sticky Notes', price: 8, color: BRAND.gold, accent: BRAND.pink, emoji: '🗒️' },
  { id: 'notepads', name: 'Charmcraft Notepad', price: 10, color: BRAND.yellow, accent: BRAND.royal, emoji: '📃' },
]

function useScrollTo() {
  const go = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return go
}

function App() {
  const [cart, setCart] = useState([])
  const [drawer, setDrawer] = useState(false)
  const [pulse, setPulse] = useState(false)
  const scrollTo = useScrollTo()

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart])

  const addToCart = (p) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === p.id)
      if (existing) {
        return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...c, { ...p, qty: 1 }]
    })
    setPulse(true)
    setTimeout(() => setPulse(false), 500)
  }

  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id))

  useEffect(() => {
    // sparkle on first load
    const t = setTimeout(() => setPulse(true), 800)
    const t2 = setTimeout(() => setPulse(false), 1600)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  return (
    <div className="min-h-screen bg-[rgb(86,11,173)] text-white overflow-x-hidden">
      <MagicCursor />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[rgb(247,37,133)] to-[rgb(255,213,0)] grid place-items-center text-[rgb(86,11,173)] font-black">
                ✨
              </div>
              <div>
                <p className="font-extrabold tracking-wide text-white leading-none">Mystic Stationery</p>
                <p className="text-xs text-white/80">Cute. Magical. Irresistible.</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button onClick={() => scrollTo('products')} className="hover:text-[rgb(253,197,0)] transition-colors">Shop</button>
              <a href="#" className="hover:text-[rgb(253,197,0)] transition-colors">About</a>
              <a href="#" className="hover:text-[rgb(253,197,0)] transition-colors">Contact</a>
            </nav>
            <button onClick={() => setDrawer(true)} className="relative group rounded-xl bg-gradient-to-r from-[rgb(247,37,133)] to-[rgb(114,9,183)] px-4 py-2 font-semibold shadow-md shadow-[rgba(253,197,0,0.3)]">
              <span className="flex items-center gap-2">
                <ShoppingBag size={18} />
                Magic Trunk
              </span>
              <motion.span
                animate={pulse ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
                className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full border border-white/30 bg-[rgb(253,197,0)] text-[rgb(86,11,173)] text-xs font-bold">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </motion.span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero with Spline cover */}
      <section className="relative h-[90vh] w-full pt-24">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/fTzRQ8pMbm1-BzvF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="relative z-10 h-full w-full bg-gradient-to-b from-black/20 via-[rgba(86,11,173,0.25)] to-[rgb(86,11,173)] pointer-events-none" />

        <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <Sparkles size={14} className="text-[rgb(253,197,0)]" /> New Drop
              <span className="text-white/90">Whimsical desk goodies</span>
            </div>
            <h1 className="mt-5 text-4xl sm:text-6xl font-black leading-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
              Stationery brewed with wonder and a dash of mischief
            </h1>
            <p className="mt-4 text-white/90 text-lg">
              Cute, collectible, and charmingly magical. Calendars, planners, journals, and notes that practically write themselves.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => scrollTo('products')} className="cursor-none rounded-2xl bg-gradient-to-r from-[rgb(253,197,0)] to-[rgb(255,213,0)] px-6 py-3 text-[rgb(86,11,173)] font-extrabold shadow-lg shadow-[rgba(253,197,0,0.4)]">
                Shop the Collection
              </button>
              <button onClick={() => setDrawer(true)} className="cursor-none rounded-2xl bg-white/10 px-6 py-3 font-semibold backdrop-blur hover:bg-white/20 transition">
                Open Magic Trunk
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2"><Wand2 size={16} className="text-[rgb(247,37,133)]" /> Wand-like cursor</div>
              <div className="flex items-center gap-2"><Star size={16} className="text-[rgb(253,197,0)]" /> Sparkle effects</div>
              <div className="flex items-center gap-2"><PackageOpen size={16} className="text-[rgb(114,9,183)]" /> Magical trunk cart</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative py-20 bg-gradient-to-b from-[rgb(86,11,173)] via-[rgb(114,9,183)] to-[rgb(86,11,173)]">
        <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
          <BackgroundStars />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-5xl font-black">Pick your potion of productivity</h2>
            <p className="mt-3 text-white/85">Each piece is charmed for delight. Mix, match, and let the magic multiply.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
              >
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-30 blur-2xl" style={{ background: `radial-gradient(closest-side, ${p.accent}, transparent)` }} />
                <div className="flex items-start justify-between">
                  <span className="text-4xl drop-shadow">{p.emoji}</span>
                  <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs">New</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-extrabold leading-tight">{p.name}</h3>
                  <p className="text-white/85">From enchanted forests to your desk.</p>
                </div>
                <div className="mt-5 h-36 w-full rounded-2xl bg-gradient-to-br shadow-inner grid place-items-center"
                  style={{ background: `linear-gradient(135deg, ${p.color} 0%, ${p.accent} 100%)` }}
                >
                  <IllustrationCute />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[rgb(253,197,0)] font-extrabold text-xl">${p.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(p)} className="rounded-xl bg-white/15 px-3 py-2 text-sm font-semibold backdrop-blur hover:bg-white/25 transition">
                    Add to Trunk
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <USP icon={<Sparkles />} title="Supremely Cute" subtitle="Playful colors and cozy shapes" />
            <USP icon={<Wand2 />} title="Whimsically Functional" subtitle="Charms that spark joy as you plan" />
            <USP icon={<Star />} title="Gifting Gold" subtitle="Perfect for friends, study buddies, or yourself" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(86,11,173)] py-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/80">© {new Date().getFullYear()} Mystic Stationery. Brewed with stardust.</p>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <a href="#" className="hover:text-[rgb(253,197,0)]">Shipping</a>
            <a href="#" className="hover:text-[rgb(253,197,0)]">Returns</a>
            <a href="#" className="hover:text-[rgb(253,197,0)]">Contact</a>
          </div>
        </div>
      </footer>

      <CartDrawer open={drawer} onClose={() => setDrawer(false)} items={cart} total={total} onRemove={removeFromCart} />

      {/* Floating Trunk button for mobile */}
      <motion.button
        onClick={() => setDrawer(true)}
        className="fixed bottom-6 right-6 z-50 rounded-2xl px-4 py-3 text-[rgb(86,11,173)] font-extrabold shadow-xl"
        style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.yellow})` }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        <span className="flex items-center gap-2">
          <ShoppingBag className="text-[rgb(86,11,173)]" size={18} /> Trunk ({cart.reduce((s, i) => s + i.qty, 0)})
        </span>
      </motion.button>
    </div>
  )
}

function CartDrawer({ open, onClose, items, total, onRemove }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="fixed bottom-0 left-1/2 z-[60] w-[92%] max-w-2xl -translate-x-1/2 overflow-hidden rounded-t-3xl border border-yellow-200/40"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{
              background: 'linear-gradient(180deg, #a36b2f 0%, #7a4d1f 60%, #5a3816 100%)',
              boxShadow: '0 -30px 80px rgba(253,197,0,0.35)'
            }}
          >
            {/* Trunk lid */}
            <div className="relative bg-[#c38b48] px-6 py-3 text-center font-black text-[rgb(86,11,173)]">
              <div className="absolute inset-x-0 -top-2 mx-auto h-2 w-40 rounded-full bg-[#d9a25f]" />
              Magic Trunk
              <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-1 text-white">
                <X size={18} />
              </button>
            </div>

            {/* Trunk body */}
            <div className="max-h-[60vh] overflow-y-auto bg-[rgba(0,0,0,0.15)] px-6 py-5 backdrop-blur">
              {items.length === 0 ? (
                <div className="grid place-items-center py-16 text-center text-white/90">
                  <PackageOpen className="mb-3" />
                  Your trunk is currently light as a feather.
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 p-4 text-white">
                      <div className="flex items-center gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-lg text-xl shadow-inner" style={{ background: `linear-gradient(135deg, ${it.color}, ${it.accent})` }}>{it.emoji}</div>
                        <div>
                          <p className="font-semibold leading-tight">{it.name}</p>
                          <p className="text-xs text-white/80">Qty {it.qty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[rgb(253,197,0)] font-bold">${(it.price * it.qty).toFixed(2)}</span>
                        <button onClick={() => onRemove(it.id)} className="rounded-lg bg-white/10 p-2 hover:bg-white/20">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trunk latch */}
            <div className="border-t border-yellow-200/30 bg-[#8a5a29]/80 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <span className="text-lg">Total</span>
                <span className="text-2xl font-black text-[rgb(253,197,0)]">${total.toFixed(2)}</span>
              </div>
              <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-[rgb(253,197,0)] to-[rgb(255,213,0)] py-3 text-center font-extrabold text-[rgb(86,11,173)] shadow-lg">
                Cast Checkout ✨
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function USP({ icon, title, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
      <div className="flex items-center gap-3 text-[rgb(253,197,0)]">{icon}<span className="font-bold text-white">{title}</span></div>
      <p className="mt-1 text-white/85">{subtitle}</p>
    </div>
  )
}

function BackgroundStars() {
  const stars = new Array(40).fill(0).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 8 + Math.random() * 10,
    hue: [BRAND.pink, BRAND.gold, BRAND.royal][Math.floor(Math.random() * 3)],
  }))
  return (
    <div className="absolute inset-0">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute"
          style={{ left: `${s.left}%`, top: `${s.top}%`, color: s.hue, fontSize: s.size }}
          initial={{ opacity: 0.3, scale: 0.6 }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 3 + Math.random() * 3 }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  )
}

function IllustrationCute() {
  // a small playful illustration using emoji + sparkles
  return (
    <div className="relative">
      <span className="text-4xl">🪄</span>
      <motion.span className="absolute -right-4 -top-2" animate={{ rotate: [0, 20, 0], y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        ✨
      </motion.span>
    </div>
  )
}

function MagicCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [particles, setParticles] = useState([])
  const lastMove = useRef(0)

  useEffect(() => {
    const handleMove = (e) => {
      const now = Date.now()
      setPos({ x: e.clientX, y: e.clientY })
      if (now - lastMove.current > 25) {
        lastMove.current = now
        const id = Math.random().toString(36).slice(2)
        const colors = [BRAND.violet, BRAND.royal, BRAND.pink, BRAND.gold, BRAND.yellow]
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = 6 + Math.random() * 10
        setParticles((p) => [...p, { id, x: e.clientX, y: e.clientY, color, size }])
        setTimeout(() => setParticles((p) => p.filter((pt) => pt.id !== id)), 520)
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[1000] pointer-events-none hidden sm:block"
        animate={{ x: pos.x + 8, y: pos.y + 8, rotate: -25 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.2 }}
      >
        <div className="drop-shadow-[0_0_10px_rgba(253,197,0,0.9)]">
          <Wand2 size={28} color={BRAND.gold} />
        </div>
      </motion.div>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="fixed z-[999] pointer-events-none"
            initial={{ opacity: 1, x: p.x, y: p.y, scale: 0.6 }}
            animate={{ opacity: 0, x: p.x + (Math.random() * 40 - 20), y: p.y + (Math.random() * 40 - 30), scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ color: p.color, fontSize: p.size }}
          >
            ✨
          </motion.span>
        ))}
      </AnimatePresence>
    </>
  )
}

export default App
