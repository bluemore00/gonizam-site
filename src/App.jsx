import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

import logo from './assets/logo.png';
import relaxfillV1 from './assets/relaxfill-v1.webp';
import relaxfillLifestyle from './assets/relaxfill-v1-lifestyle.webp';
import relaxfillV2 from './assets/relaxfill-v2-concept.webp';
import evening from './assets/evening.webp';
import iconNeck from './assets/icons/neck-support.webp';
import iconMassage from './assets/icons/gentle-massage.webp';
import iconWarmth from './assets/icons/warmth.webp';
import iconSupport from './assets/icons/steady-support.webp';

/* =========================================================
 * 사이트 기본 정보 — 여기만 고치면 페이지 전체에 반영됩니다.
 * ========================================================= */
// 구매 버튼 연결 주소 (쿠팡 릴렉스필 V1 상품 페이지)
const STORE_URL = 'https://www.coupang.com/vp/products/9738726820?itemId=29146827219';

// Google Analytics 4 측정 ID (예: 'G-ABC123XYZ'). 넣으면 방문자 수와 '구매하기' 클릭 수가 집계됩니다.
// 비워 두면 분석 스크립트를 불러오지 않습니다.
const GA_MEASUREMENT_ID = '';

const CONTACT = {
  phone: '', // 고객센터 번호를 넣으면 푸터에 표시됩니다
  email: 'bluemore001@gmail.com',
  hours: '평일 10:00 - 17:00 (주말/공휴일 휴무)',
};

// 전자상거래법상 사업자 정보. 값을 채운 항목만 푸터에 표시됩니다.
const BUSINESS_REG_NO = '167-88-03690';
const BUSINESS_INFO = [
  { label: '상호', value: '주식회사 블루모어' },
  { label: '대표자', value: '정대희' },
  { label: '사업자등록번호', value: BUSINESS_REG_NO },
  { label: '통신판매업 신고번호', value: '제2025-경기안산-3157호' },
  { label: '주소', value: '경기도 안산시 단원구 중앙대로 915, 제408-133호 (고잔동, 월드코아빌딩)' },
  { label: '이메일', value: CONTACT.email },
];

const V2_PATH = '/relaxfill-v2';

// 첫 페이지 메뉴 (페이지 안의 섹션으로 이동)
const HOME_NAV = [
  { id: 'night', label: '이야기' },
  { id: 'relaxfill', label: '릴렉스필' },
  { id: 'tonight', label: '오늘 밤' },
  { id: 'faq', label: '자주 묻는 질문' },
];

/* =========================================================
 * 문구 — 잠 못 드는 밤의 혼잣말로 이야기를 이어갑니다.
 * ========================================================= */
// morning: true 인 줄은 밝아진 아침 배경 위에 놓여 어두운 글자로 표시됩니다.
const NIGHT_MONOLOGUE = [
  { time: '밤 11:30', line: '내일 일찍 일어나야 하는데… 오늘은 빨리 잘 수 있을까?' },
  { time: '밤 12:40', line: '잠이 중요한 건 아는데, 잠이 안 와요.' },
  { time: '새벽 1:20', line: '목이 뻐근해서 자꾸 뒤척이게 되네.' },
  { time: '아침 7:00', line: '어젯밤은 좀 불편했는데..', morning: true },
];

const REASONS = [
  {
    no: '01',
    title: '누우면 닿는 곳에서 시작해요',
    body: '따로 시간을 내지 않아도 괜찮아요. 매일 밤 머리를 기대는 베개니까요.',
  },
  {
    no: '02',
    title: '수면을 위해 설계한 자극',
    body: '세게 풀어주는 마사지가 아니에요. 잠들기 좋도록, 세게 누르지 않는 부드러운 리듬으로 설계했어요.',
  },
  {
    no: '03',
    title: '끝나면 그대로 잠들면 돼요',
    body: '이완 시간이 끝나면 스스로 멈춰요. 일어날 필요 없이 그대로 베고 주무세요.',
  },
];

const FEATURES = [
  { icon: iconNeck, title: '후두부·경추 지지', body: '머리와 목이 만나는 곳을 안정적으로 받쳐 주는 곡면 구조' },
  { icon: iconMassage, title: '저자극 마사지', body: '강한 압박 대신 부드럽고 반복적인 리듬' },
  { icon: iconWarmth, title: '온열 케어', body: '피부 접촉면 기준 약 41°C의 따뜻한 온기' },
  { icon: iconSupport, title: '그대로 베개로', body: '마사지가 끝난 뒤에도 그대로 베고 잠들 수 있어요' },
];

// 제품 사양 칩
const SPECS = ['30분 자동 종료', 'USB-C 충전 · 1회 충전 약 6회 사용', '높이 약 10cm', '길이 약 57cm'];

// 제품 사진 위 표시점 (x, y = 사진 안에서의 위치 %)
const HOTSPOTS = [
  { n: 1, x: 57, y: 47, label: '머리와 목이 닿는 곳', body: '온열과 저자극 마사지가 후두부·목 주변에 닿아요' },
  { n: 2, x: 17, y: 90, label: '조작 버튼', body: '버튼 하나로 켜고, 30분이 지나면 스스로 꺼져요' },
];

const TONIGHT = [
  { step: '1', time: '0분', title: '눕는다', thought: '아, 따뜻하다.' },
  { step: '2', time: '~ 30분', title: '온기와 리듬이 번진다', thought: '목이 좀 풀리는 것 같아.' },
  { step: '3', time: '30분', title: '스스로 멈춘다', thought: '어, 벌써 끝났네.' },
  { step: '4', time: '그 후', title: '그대로 잠든다', thought: '…' },
];

// 자주 묻는 질문 — 묶음별로 정리. open: true 는 처음부터 펼쳐 둡니다.
const FAQ_GROUPS = [
  {
    title: '어떤 제품인가요',
    items: [
      {
        q: '그냥 마사지기랑 뭐가 달라요?',
        a: '릴렉스필은 잠들기 전 시간을 위해 만든 베개예요. 마사지가 끝나면 스스로 멈추고, 그대로 베고 잠들 수 있어요.',
      },
      {
        q: '의료기기인가요?',
        a: '아니요. 잠들기 전 편안한 휴식을 돕는 생활 제품이에요. 질병의 진단·치료·예방을 목적으로 하지 않아요.',
        open: true,
      },
      {
        q: '베개 높이가 저한테 맞을까요?',
        a: '높이는 약 10cm, 길이는 약 57cm예요. 평소 쓰시는 베개 높이와 비교해 보시면 도움이 돼요.',
      },
    ],
  },
  {
    title: '쓰는 방법',
    items: [
      { q: '한 번에 얼마나 작동해요?', a: '30분이 지나면 스스로 멈춰요. 따로 끄지 않아도 돼요.' },
      {
        q: '충전은 얼마나 자주 해야 해요?',
        a: 'USB-C로 충전하고, 한 번 충전하면 약 6회 사용할 수 있어요. 충전 중에는 사용하지 않는 것을 권장해요.',
      },
      { q: '소리가 나지는 않나요?', a: '조용한 사무실 정도의 소리예요.' },
    ],
  },
  {
    title: '안전하게 쓰려면',
    items: [
      { q: '아이도 써도 되나요?', a: '어린이는 전문의와 상담한 뒤 사용해 주세요.' },
      { q: '온열이 너무 뜨겁진 않나요?', a: '피부에 닿는 면을 기준으로 약 41도예요. 따뜻하게 느껴지는 정도로 설계했어요.' },
    ],
  },
  {
    title: '관리와 A/S',
    items: [
      {
        q: '커버는 빨 수 있어요?',
        a: '별도의 베개 커버를 씌워 사용해 주세요. 오염되었을 때는 물티슈로 가볍게 닦아 주세요.',
      },
      {
        q: '고장 나면 어떻게 하나요?',
        a: `구매일로부터 12개월 동안 무상 A/S를 받을 수 있어요. 다만 제품 규격 외 용도로 사용해 생긴 파손과 고장은 보증되지 않아요. 고객센터(${CONTACT.email})로 연락 주세요.`,
      },
    ],
  },
];

/* =========================================================
 * 동작 (분석, 페이지 이동, 스크롤 효과)
 * ========================================================= */
function useAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || window.gtag) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }, []);
}

// '구매하기' 클릭 기록. placement = 어느 버튼에서 눌렀는지
function trackPurchaseClick(placement) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'purchase_click', { placement, link_url: STORE_URL, transport_type: 'beacon' });
  }
}

// 간단한 페이지 이동 (첫 페이지 / V2 페이지)
function usePath() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const navigate = (to) => {
    if (to === window.location.pathname) return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo(0, 0);
    if (typeof window.gtag === 'function') window.gtag('event', 'page_view', { page_path: to });
  };
  return [path, navigate];
}

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// 스크롤해서 화면에 들어오면 천천히 나타나는 효과
function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(prefersReducedMotion);
  useEffect(() => {
    if (shown || !ref.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* =========================================================
 * 공통 요소
 * ========================================================= */
function Eyebrow({ children, light = false }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? 'text-sand/70' : 'text-dusk'}`}>{children}</p>
  );
}

function StoreButton({ children = '쿠팡에서 보기', variant = 'solid', placement }) {
  const styles =
    variant === 'solid' ? 'bg-ink text-linen hover:bg-dusk' : 'border border-ink/25 text-ink hover:border-ink';
  return (
    <a
      href={STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackPurchaseClick(placement)}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors ${styles}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

const container = 'mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12';

/* =========================================================
 * 첫 페이지 — 하룻밤의 이야기
 * ========================================================= */
function HomePage() {
  return (
    <main id="top">
      {/* 1. 말 걸기 */}
      <section className="relative overflow-hidden pt-16">
        <div className={`${container} grid items-center gap-12 py-16 md:grid-cols-12 md:py-24 lg:gap-20`}>
          <div className="md:col-span-6">
            <Eyebrow>잠들기 전, 고니잠</Eyebrow>
            <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.35] tracking-tight sm:text-5xl md:text-[3.4rem] xl:text-[4rem]">
              오늘은
              <br />
              빨리 잘 수 있을까?
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              누구나 한 번쯤 해 본 혼잣말이죠.
              <br />
              고니잠은 그런 밤이 조금 더 편안해지기를 바라요.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#night"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-linen transition-colors hover:bg-dusk"
              >
                이야기 읽기
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#relaxfill"
                className="inline-flex items-center justify-center rounded-full border border-ink/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-ink"
              >
                릴렉스필 보기
              </a>
            </div>
          </div>
          <div className="md:col-span-6">
            <img
              src={relaxfillLifestyle}
              alt="릴렉스필 베개를 베고 편안하게 누워 있는 모습"
              width="1000"
              height="910"
              className="w-full rounded-[2rem] object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* 2. 하룻밤의 혼잣말 */}
      {/* 배경이 스크롤을 따라 밤(남색) → 새벽 → 아침(따뜻한 빛)으로 바뀝니다 */}
      <section
        id="night"
        className="text-linen"
        style={{
          background:
            'linear-gradient(180deg, #212834 0%, #2b3240 22%, #363a52 40%, #55536e 55%, #8d8095 66%, #c9b0a6 76%, #ecdccd 85%, #f7efe6 100%)',
        }}
      >
        <div className={`${container} py-28 sm:py-40`}>
          <Reveal>
            <Eyebrow light>어젯밤, 우리의 혼잣말</Eyebrow>
          </Reveal>
          <ol className="mt-20 space-y-28 sm:space-y-44">
            {NIGHT_MONOLOGUE.map((m, i) => (
              <Reveal
                as="li"
                key={m.time}
                delay={i * 80}
                className={`grid gap-3 md:grid-cols-12 md:items-baseline ${m.morning ? 'pt-24 sm:pt-40' : ''}`}
              >
                <span
                  className={`text-sm font-semibold tabular-nums md:col-span-2 ${m.morning ? 'text-ink/50' : 'text-sand/60'}`}
                >
                  {m.time}
                </span>
                <p
                  className={`font-serif text-[1.65rem] font-semibold leading-snug sm:text-3xl md:col-span-10 lg:text-[2.6rem] ${
                    m.morning ? 'text-ink' : 'text-linen'
                  }`}
                >
                  {m.line}
                </p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-24 border-t border-ink/10 pt-14 sm:mt-32">
            <p className="max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl">
              몸은 누웠는데, 마음과 어깨는 아직 하루를 붙잡고 있는 밤.
              <br className="hidden sm:block" />
              고니잠은 그 밤의 혼잣말에서 시작했어요.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. 관점 바꾸기 */}
      <section className="py-24 sm:py-36">
        <div className={`${container} text-center`}>
          <Reveal>
            <p className="text-lg text-muted sm:text-xl">좋은 잠은 침대에 눕는 순간이 아니라,</p>
            <p className="mt-2 text-lg text-muted sm:text-xl">잠들기 전 그 짧은 시간에서 시작돼요.</p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-10 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl lg:text-5xl">
              잠은 재우는 게 아니라,
              <br />
              찾아오는 거니까요.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. 왜 베개일까 */}
      <section className="pb-24 sm:pb-36">
        <div className={`${container} grid items-center gap-14 md:grid-cols-12 lg:gap-20`}>
          <Reveal className="order-2 md:order-1 md:col-span-5">
            <img
              src={evening}
              alt="잠들기 전 침대에 누워 쉬고 있는 모습"
              width="572"
              height="1024"
              loading="lazy"
              decoding="async"
              className="mx-auto max-h-[600px] w-auto rounded-[2rem] object-cover"
            />
          </Reveal>
          <Reveal className="order-1 md:order-2 md:col-span-7" delay={150}>
            <Eyebrow>Why pillow</Eyebrow>
            <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
              매일 밤,
              <br />
              머리를 기대는 곳에서.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">
              하루의 긴장이 가장 오래 머무는 머리와 목 사이. 그리고 누우면 누구나 자연스럽게 닿는 곳. 따로 시간을 내지 않아도 되도록, 고니잠은 베개에서 시작했어요.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. 제안 — 릴렉스필 */}
      <section id="relaxfill" className="bg-sand py-24 sm:py-32">
        <div className={container}>
          <div className="grid items-center gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <Eyebrow>RELAXFILL</Eyebrow>
              <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
                누운 그대로,
                <br />
                목 주변에 온기와 리듬을.
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                릴렉스필은 잠들기 전 후두부와 목 주변에 따뜻한 온기와 부드러운 마사지를 더하는 베개예요. 이완이 끝나면, 그대로 베고 주무세요.
              </p>
              <div className="mt-9">
                <StoreButton placement="product" />
              </div>
            </Reveal>
            <Reveal className="md:col-span-7" delay={150}>
              <div className="relative mx-auto w-full max-w-xl">
                <img
                  src={relaxfillV1}
                  alt="고니잠 릴렉스필 베개"
                  width="862"
                  height="707"
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                />
                {HOTSPOTS.map((h) => (
                  <span
                    key={h.n}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    aria-hidden="true"
                  >
                    <span className="absolute inset-0 rounded-full bg-linen/70 motion-safe:animate-ping" />
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-semibold text-linen ring-4 ring-linen/80">
                      {h.n}
                    </span>
                  </span>
                ))}
              </div>
              <ol className="mx-auto mt-6 grid max-w-xl gap-4 sm:grid-cols-2">
                {HOTSPOTS.map((h) => (
                  <li key={h.n} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-linen">
                      {h.n}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{h.label}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">{h.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <ul className="mt-20 grid gap-5 md:grid-cols-3">
            {REASONS.map((r, i) => (
              <Reveal as="li" key={r.no} delay={i * 120} className="rounded-3xl bg-linen p-8">
                <span className="text-sm font-semibold text-dusk">{r.no}</span>
                <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.body}</p>
              </Reveal>
            ))}
          </ul>

          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 100} className="rounded-3xl bg-linen p-7">
                <img src={f.icon} alt="" width="160" height="160" loading="lazy" className="h-16 w-16" />
                <h3 className="mt-5 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </Reveal>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="제품 사양">
            {SPECS.map((s) => (
              <li key={s} className="rounded-full border border-stone bg-linen px-4 py-2 text-sm text-ink/80">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. 오늘 밤, 이렇게 */}
      <section id="tonight" className="py-24 sm:py-32">
        <div className={container}>
          <Reveal className="max-w-xl">
            <Eyebrow>Tonight</Eyebrow>
            <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">오늘 밤은, 이렇게.</h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {TONIGHT.map((t, i) => (
              <Reveal as="li" key={t.step} delay={i * 150}>
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-linen">
                    {t.step}
                  </span>
                  {i < TONIGHT.length - 1 && <span className="hidden h-px flex-1 bg-stone lg:block" aria-hidden="true" />}
                </div>
                <p className="mt-5 inline-block rounded-full bg-sand px-3 py-1 text-xs font-semibold tabular-nums text-dusk">
                  {t.time}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 font-serif text-xl text-muted">{t.thought}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-24 text-center" delay={200}>
            <p className="text-sm text-muted">그리고 다음 날 아침,</p>
            <p className="mt-4 font-serif text-2xl font-semibold sm:text-3xl">잠이 많이 필요했나 보다.</p>
          </Reveal>
        </div>
      </section>

      {/* 7. 자주 묻는 질문 */}
      <section id="faq" className="border-t border-stone py-24 sm:py-32">
        <div className={`${container} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight">자주 묻는 질문</h2>
          </div>
          <div className="space-y-12 md:col-span-8">
            {FAQ_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-dusk">{group.title}</h3>
                <div className="mt-3 divide-y divide-stone border-y border-stone">
                  {group.items.map((f) => (
                    <details key={f.q} className="group py-5" open={f.open}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <span className="text-2xl font-light text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 마지막 인사 */}
      <section className="bg-sand py-24 sm:py-36">
        <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="text-lg text-ink/70 sm:text-xl">오늘 하루도 수고 많았어요.</p>
          <p className="mt-6 font-serif text-3xl font-semibold leading-snug sm:text-4xl">
            내일은 개운하게
            <br />
            일어날 수 있을까?
          </p>
          <p className="mt-6 text-lg text-ink/70 sm:text-xl">그런 밤이라면, 고니잠이 곁에 있을게요.</p>
          <div className="mt-12 flex justify-center">
            <StoreButton placement="closing">릴렉스필 만나보기</StoreButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

/* =========================================================
 * 릴렉스필 V2 페이지 (개발 중)
 * ========================================================= */
function V2Page({ navigate }) {
  return (
    <main className="pt-16">
      <section className="bg-night pb-24 pt-16 text-linen sm:pb-32 sm:pt-24">
        <div className={`${container} grid items-center gap-12 md:grid-cols-12 lg:gap-20`}>
          <div className="md:col-span-5">
            <Eyebrow light>RELAXFILL V2 · 개발 중</Eyebrow>
            <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.35] sm:text-5xl">
              마사지 끝나면,
              <br />
              그대로 잠들고 싶어.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-sand/75">
              릴렉스필을 쓰신 분들의 이 마음을 담아, 다음 릴렉스필을 만들고 있어요.
            </p>
          </div>
          <div className="md:col-span-7">
            <img
              src={relaxfillV2}
              alt="개발 중인 릴렉스필 V2 콘셉트 이미지"
              width="1200"
              height="696"
              className="w-full rounded-[2rem] bg-linen/[0.06] object-contain p-6 sm:p-10"
            />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className={container}>
          <Reveal className="max-w-2xl">
            <Eyebrow>What we&apos;re building</Eyebrow>
            <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
              이완이 끝나면,
              <br />
              베개 안으로.
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              다음 릴렉스필은 마사지가 끝나면 모듈이 베개 안으로 들어가, 그대로 편안한 수면 자세로 이어지는 것을 목표로 개발하고 있어요.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              { t: '그대로 베개가 돼요', b: '마사지 모듈이 베개 안으로 들어가, 목에 걸리는 느낌 없이 그대로 잠들 수 있도록.' },
              {
                t: '닿는 위치와 방식부터 다시',
                b: '한의학에서 주목해 온 후두부 주변의 위치와, 두개천골요법(CST)의 부드럽고 반복적인 방식에서 영감을 얻어 설계하고 있어요.',
              },
              { t: '나에게 맞춰 가요', b: '사용하는 사람의 상태와 취향에 맞춰 리듬과 세기를 조절하는 방향을 연구하고 있어요.' },
              { t: '안전을 먼저 생각해요', b: '누르는 힘이 과하지 않도록 하중을 살피는 안전 설계를 함께 검토하고 있어요.' },
            ].map((x, i) => (
              <Reveal as="li" key={x.t} delay={i * 120} className="rounded-3xl border border-stone p-8">
                <h3 className="text-lg font-semibold">{x.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{x.b}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-xs leading-relaxed text-muted">
            개발 중인 콘셉트입니다. 실제 출시 제품의 디자인, 기능, 출시 시기는 달라질 수 있으며 확정되면 이 페이지에서 알려드릴게요.
          </p>
        </div>
      </section>

      <section className="bg-sand py-24 sm:py-32">
        <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="text-lg text-ink/70">기다리는 동안에도,</p>
          <p className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">오늘 밤은 곤히.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StoreButton placement="v2_page">지금의 릴렉스필 보기</StoreButton>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="inline-flex items-center justify-center rounded-full border border-ink/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-ink"
            >
              고니잠 이야기로
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

/* =========================================================
 * 전체 틀 (헤더·푸터·페이지 전환)
 * ========================================================= */
export default function App() {
  const [path, navigate] = usePath();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  useAnalytics();

  const onV2 = path.replace(/\/$/, '') === V2_PATH;
  const businessInfo = BUSINESS_INFO.filter((i) => i.value.trim());

  useEffect(() => {
    document.title = onV2
      ? '릴렉스필 V2 (개발 중) | 고니잠 GONIZAM'
      : '고니잠 GONIZAM | 좋은 잠은 잠들기 전부터 시작됩니다';
  }, [onV2]);

  // 섹션 링크: 첫 페이지에서는 그대로 스크롤, V2 페이지에서는 첫 페이지로 돌아가서 이동
  const sectionHref = (id) => (onV2 ? `/#${id}` : `#${id}`);
  const goV2 = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate(V2_PATH);
  };
  const goHome = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onV2) navigate('/');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-linen text-ink">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen || onV2 ? 'border-b border-stone/60 bg-linen/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className={`${container} flex h-16 items-center justify-between`}>
          <a href="/" onClick={goHome} aria-label="고니잠 홈으로">
            <img src={logo} alt="GONIZAM" width="811" height="134" className="h-5 w-auto sm:h-6" />
          </a>

          <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="주요 메뉴">
            {HOME_NAV.map((item) => (
              <a key={item.id} href={sectionHref(item.id)} className="text-muted transition-colors hover:text-ink">
                {item.label}
              </a>
            ))}
            <a
              href={V2_PATH}
              onClick={goV2}
              aria-current={onV2 ? 'page' : undefined}
              className={`rounded-full border px-3.5 py-1.5 transition-colors ${
                onV2 ? 'border-ink bg-ink font-semibold text-linen' : 'border-stone text-ink hover:border-ink'
              }`}
            >
              릴렉스필 V2
            </a>
          </nav>

          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackPurchaseClick('header')}
            className="hidden rounded-full bg-ink px-5 py-2 text-xs font-semibold text-linen transition-colors hover:bg-dusk md:inline-flex"
          >
            구매하기
          </a>

          <button
            type="button"
            className="-mr-2 p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="모바일 메뉴" className="border-b border-stone/60 bg-linen px-5 pb-8 pt-2 md:hidden">
            <ul className="flex flex-col">
              {HOME_NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={sectionHref(item.id)}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-stone/50 py-4 text-lg font-semibold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={V2_PATH} onClick={goV2} className="flex items-center gap-2 border-b border-stone/50 py-4 text-lg font-semibold">
                  릴렉스필 V2
                  <span className="rounded-full bg-sand px-2 py-0.5 text-xs font-semibold text-muted">개발 중</span>
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <StoreButton placement="mobile_menu" />
            </div>
          </nav>
        )}
      </header>

      {onV2 ? <V2Page navigate={navigate} /> : <HomePage />}

      <footer className="border-t border-stone bg-linen py-14">
        <div className={container}>
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            <div>
              <img src={logo} alt="GONIZAM" width="811" height="134" loading="lazy" className="h-5 w-auto" />
              <p className="mt-4 text-sm text-muted">좋은 잠은 잠들기 전부터 시작됩니다.</p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
              <div>
                <p className="font-semibold">메뉴</p>
                <ul className="mt-3 space-y-2 text-muted">
                  {HOME_NAV.map((item) => (
                    <li key={item.id}>
                      <a href={sectionHref(item.id)} className="hover:text-ink">
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={V2_PATH} onClick={goV2} className="hover:text-ink">
                      릴렉스필 V2
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">고객센터</p>
                <ul className="mt-3 space-y-2 text-muted">
                  {CONTACT.phone && (
                    <li>
                      <a href={`tel:${CONTACT.phone}`} className="hover:text-ink">
                        {CONTACT.phone}
                      </a>
                    </li>
                  )}
                  <li>{CONTACT.hours}</li>
                  <li>
                    <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-ink">
                      {CONTACT.email}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">스토어</p>
                <ul className="mt-3 space-y-2 text-muted">
                  <li>
                    <a
                      href={STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackPurchaseClick('footer')}
                      className="inline-flex items-center gap-1 hover:text-ink"
                    >
                      쿠팡 공식 판매처 <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-stone pt-8 text-xs leading-relaxed text-muted">
            <p>
              {businessInfo.map((item, i) => (
                <span key={item.label}>
                  {i > 0 && <span className="mx-2 text-stone">|</span>}
                  {item.label} : {item.value}
                </span>
              ))}
              <span className="mx-2 text-stone">|</span>
              <a
                href={`https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${BUSINESS_REG_NO.replace(/-/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-ink"
              >
                사업자정보확인
              </a>
            </p>
            <p className="mt-4">
              고니잠 릴렉스필은 의료기기가 아니며, 질병의 진단·치료·예방을 목적으로 하지 않습니다.
            </p>
            <p className="mt-2">© 2026 주식회사 블루모어. 고니잠(GONIZAM)은 주식회사 블루모어의 브랜드입니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
