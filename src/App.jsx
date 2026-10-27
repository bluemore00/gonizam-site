import { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

import logo from './assets/logo.png';
import relaxfillV1 from './assets/relaxfill-v1.webp';
import relaxfillLifestyle from './assets/relaxfill-v1-lifestyle.webp';
import relaxfillV2 from './assets/relaxfill-v2-concept.webp';
import evening from './assets/evening.webp';

/* =========================================================
 * 사이트 기본 정보 — 여기만 고치면 페이지 전체에 반영됩니다.
 * ========================================================= */
// 구매 버튼 연결 주소 (쿠팡 릴렉스필 V1 상품 페이지)
const STORE_URL = 'https://www.coupang.com/vp/products/9738726820?itemId=29146827219';

// Google Analytics 4 측정 ID (예: 'G-ABC123XYZ'). 넣으면 방문자 수와 '구매하기' 클릭 수가 집계됩니다.
// 비워 두면 분석 스크립트를 불러오지 않습니다.
const GA_MEASUREMENT_ID = '';

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

// '구매하기' 클릭 기록. placement = 어느 버튼에서 눌렀는지 (hero, product, header 등)
function trackPurchaseClick(placement) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'purchase_click', {
      placement,
      link_url: STORE_URL,
      transport_type: 'beacon',
    });
  }
}

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

// V2 소개 섹션 노출 여부. 개발 중인 제품을 아직 공개하고 싶지 않으면 false로 바꾸세요.
const SHOW_V2_PREVIEW = true;

const NAV_ITEMS = [
  { id: 'story', label: '브랜드 이야기' },
  { id: 'relaxfill', label: '릴렉스필' },
  { id: 'ritual', label: '사용 흐름' },
  { id: 'promise', label: '고니잠의 약속' },
];

const DAY_TO_NIGHT = [
  {
    step: '01',
    title: '낮 동안 쌓이는 긴장',
    body: '업무와 스마트폰, 오래 앉아 있는 자세. 하루의 피로는 목과 어깨 주변에 조용히 쌓입니다.',
  },
  {
    step: '02',
    title: '침대까지 이어지는 각성',
    body: '몸은 침대에 누웠지만 긴장은 아직 그대로입니다. 아직 잠들 준비가 되지 않은 상태죠.',
  },
  {
    step: '03',
    title: '그래서, 잠들기 전 시간',
    body: '고니잠은 잠을 억지로 재우지 않습니다. 몸이 먼저 편안해지는 시간을 만듭니다.',
  },
];

const FEATURES = [
  { title: '후두부·경추 지지', body: '누웠을 때 머리와 목이 만나는 곳을 안정적으로 받쳐 주는 곡면 구조' },
  { title: '저자극 마사지', body: '강한 압박 대신 부드럽고 반복적인 리듬으로 목 주변을 풀어 줍니다' },
  { title: '온열 케어', body: '따뜻한 온기가 하루의 긴장을 내려놓는 시간을 함께합니다' },
  { title: '자동 종료', body: '이완 시간이 끝나면 스스로 멈춰, 따로 끄지 않아도 됩니다' },
  { title: '그대로 베개로', body: '마사지가 끝난 뒤에도 일어날 필요 없이 그대로 베고 잠들 수 있습니다' },
  { title: 'USB-C 충전', body: '선 없이 침대 위에서 편하게 쓰는 충전식 구조' },
];

const RITUAL = [
  { step: '1', title: '눕는다', body: '평소처럼 베개에 머리를 기댑니다.' },
  { step: '2', title: '편안함을 느낀다', body: '온열과 저자극 마사지로 목 주변의 긴장을 풉니다.' },
  { step: '3', title: '이완이 끝난다', body: '정해진 시간이 지나면 기능이 스스로 멈춥니다.' },
  { step: '4', title: '자연스럽게 잠으로', body: '그대로 누운 채, 잠이 찾아오기를 기다립니다.' },
];

const PROMISES = [
  { title: '잠을 강제로 유도하지 않습니다', body: '잠은 억지로 드는 것이 아니라 찾아오는 것이라고 믿습니다.' },
  { title: '치료를 약속하지 않습니다', body: '고니잠은 의료기기가 아닙니다. 수면 준비를 편안하게 돕는 생활 제품입니다.' },
  { title: '편안함을 먼저 생각합니다', body: '모든 기능은 “아, 편하다”는 경험을 위해서만 더합니다.' },
  { title: '검증한 만큼만 말합니다', body: '제품의 기능과 앞으로의 개발 목표를 구분해 정직하게 알려드립니다.' },
];

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

function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

function Eyebrow({ children, light = false }) {
  return (
    <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${light ? 'text-sand/70' : 'text-dusk'}`}>
      {children}
    </p>
  );
}

function StoreButton({ children = '쿠팡에서 구매하기', variant = 'solid', placement }) {
  const styles =
    variant === 'solid'
      ? 'bg-ink text-linen hover:bg-dusk'
      : 'border border-ink/25 text-ink hover:border-ink';
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);
  const closeMenu = () => setMenuOpen(false);
  const businessInfo = BUSINESS_INFO.filter((i) => i.value.trim());
  useAnalytics();

  return (
    <div className="min-h-screen bg-linen text-ink">
      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen ? 'bg-linen/90 backdrop-blur-md border-b border-stone/60' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" onClick={closeMenu} aria-label="고니잠 홈으로">
            <img src={logo} alt="GONIZAM" width="811" height="134" className="h-5 w-auto sm:h-6" />
          </a>

          <nav className="hidden items-center gap-9 text-sm md:flex" aria-label="주요 메뉴">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`transition-colors hover:text-ink ${active === item.id ? 'text-ink font-semibold' : 'text-muted'}`}
              >
                {item.label}
              </a>
            ))}
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
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={closeMenu} className="block border-b border-stone/50 py-4 text-lg font-semibold">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <StoreButton placement="mobile_menu" />
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden pt-16">
          <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-5 py-16 sm:px-8 lg:px-12 lg:gap-20 md:grid-cols-12 md:py-24">
            <div className="md:col-span-6">
              <Eyebrow>Sleep Wellness · Pre-Sleep Care</Eyebrow>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.25] tracking-tight sm:text-5xl md:text-[3.4rem] xl:text-[4rem]">
                좋은 잠은
                <br />
                잠들기 전부터
                <br />
                시작됩니다.
              </h1>
              <p className="mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                하루 동안 쌓인 긴장을 내려놓고, 몸이 편안해지는 시간. 고니잠은 잠들기 전의 경험을 설계합니다.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#relaxfill"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-linen transition-colors hover:bg-dusk"
                >
                  릴렉스필 알아보기
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#story"
                  className="inline-flex items-center justify-center rounded-full border border-ink/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-ink"
                >
                  브랜드 이야기
                </a>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-sand sm:-inset-6" aria-hidden="true" />
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
          </div>
        </section>

        {/* STORY — 문제 정의 */}
        <section id="story" className="bg-night py-24 text-linen sm:py-32">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 md:grid-cols-12">
              <div className="md:col-span-5">
                <Eyebrow light>Sleep doesn&apos;t start in bed</Eyebrow>
                <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
                  몸은 침대에 누웠지만,
                  <br />
                  아직 잠들 준비가
                  <br />
                  되지 않은 상태.
                </h2>
                <p className="mt-6 leading-relaxed text-sand/75">
                  피곤한데, 왜 누우면 잠이 오지 않을까요. 수면은 침대에 눕는 순간 시작되는 것이 아니라, 잠들기 전의 준비 과정에서부터 시작됩니다.
                </p>
              </div>
              <ol className="grid gap-4 md:col-span-7">
                {DAY_TO_NIGHT.map((item) => (
                  <li key={item.step} className="rounded-3xl border border-linen/10 bg-linen/[0.04] p-7">
                    <div className="flex items-baseline gap-5">
                      <span className="text-sm font-semibold text-sand/50">{item.step}</span>
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-sand/70">{item.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-20 border-t border-linen/10 pt-14">
              <p className="text-sm text-sand/60">고니잠이 집중하는 순간</p>
              <div className="mt-5 flex flex-col gap-3 text-xl font-semibold sm:flex-row sm:items-center sm:gap-5 sm:text-2xl">
                <span className="text-sand/50">일상 활동</span>
                <ArrowRight className="hidden h-5 w-5 text-sand/40 sm:block" aria-hidden="true" />
                <span className="rounded-full bg-linen px-5 py-2 text-night">수면 전 이완</span>
                <ArrowRight className="hidden h-5 w-5 text-sand/40 sm:block" aria-hidden="true" />
                <span className="text-sand/50">자연스러운 수면 전환</span>
              </div>
              <p className="mt-8 max-w-2xl leading-relaxed text-sand/75">
                고니잠은 잠을 재우는 기술이 아니라, 잠들기 좋은 상태를 만드는 기술을 지향합니다.
              </p>
            </div>
          </div>
        </section>

        {/* WHY PILLOW */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-5 sm:px-8 lg:px-12 lg:gap-20 md:grid-cols-12">
            <div className="order-2 md:order-1 md:col-span-5">
              <img
                src={evening}
                alt="잠들기 전 침대에 누워 쉬고 있는 모습"
                width="572"
                height="1024"
                loading="lazy"
                decoding="async"
                className="mx-auto max-h-[560px] w-auto rounded-[2rem] object-cover"
              />
            </div>
            <div className="order-1 md:order-2 md:col-span-7">
              <Eyebrow>Why pillow</Eyebrow>
              <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
                잠들기 전,
                <br />
                머리와 목이 만나는 곳.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-muted">
                하루의 긴장이 쉽게 쌓이는 머리와 목 주변. 그리고 누우면 누구나 자연스럽게 닿는 곳. 그래서 고니잠은 매일 베고 자는 베개에서 시작합니다.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">
                한의학에서 주목해 온 후두부 주변의 위치와, 두개천골요법(CST)의 부드럽고 반복적인 저자극 방식에서 설계의 영감을 얻었습니다.
              </p>
            </div>
          </div>
        </section>

        {/* RELAXFILL V1 */}
        <section id="relaxfill" className="bg-sand py-24 sm:py-32">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-5">
                <Eyebrow>RELAXFILL V1</Eyebrow>
                <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
                  릴렉스필
                  <br />
                  마사지·온열 리커버리 베개
                </h2>
                <p className="mt-6 leading-relaxed text-muted">
                  잠들기 전 베개에 누운 그대로, 후두부와 목 주변에 온기와 부드러운 마사지를 더합니다. 이완이 끝나면 그대로 베고 잠드세요.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <StoreButton placement="product" />
                </div>
              </div>
              <div className="md:col-span-7">
                <img
                  src={relaxfillV1}
                  alt="고니잠 릴렉스필 V1 베개"
                  width="862"
                  height="707"
                  loading="lazy"
                  decoding="async"
                  className="mx-auto w-full max-w-xl"
                />
              </div>
            </div>

            <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <li key={f.title} className="bg-linen p-7">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              고니잠 릴렉스필은 의료기기가 아니며, 질병의 진단·치료·예방을 목적으로 하지 않습니다. 상세 사양은 판매 페이지에서 확인해 주세요.
            </p>
          </div>
        </section>

        {/* RITUAL */}
        <section id="ritual" className="py-24 sm:py-32">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-xl">
              <Eyebrow>Pre-sleep ritual</Eyebrow>
              <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
                복잡한 설정 없이,
                <br />
                눕는 것에서 시작합니다.
              </h2>
            </div>
            <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {RITUAL.map((r, i) => (
                <li key={r.step} className="relative">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-linen">
                      {r.step}
                    </span>
                    {i < RITUAL.length - 1 && <span className="hidden h-px flex-1 bg-stone lg:block" aria-hidden="true" />}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-16 text-center text-2xl font-semibold tracking-tight sm:text-3xl">“아, 편하다.”</p>
          </div>
        </section>

        {/* V2 PREVIEW */}
        {SHOW_V2_PREVIEW && (
          <section className="bg-night py-24 text-linen sm:py-32">
            <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-5 sm:px-8 lg:px-12 lg:gap-20 md:grid-cols-12">
              <div className="md:col-span-5">
                <Eyebrow light>Next · 개발 중</Eyebrow>
                <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
                  이완이 끝나면,
                  <br />
                  베개 안으로.
                </h2>
                <p className="mt-6 leading-relaxed text-sand/75">
                  다음 릴렉스필은 마사지가 끝나면 모듈이 베개 안으로 들어가, 그대로 편안한 수면 자세로 이어지는 구조를 목표로 개발하고 있습니다.
                </p>
                <p className="mt-6 text-xs leading-relaxed text-sand/50">
                  개발 중인 콘셉트 이미지입니다. 실제 출시 제품의 디자인과 기능은 달라질 수 있습니다.
                </p>
              </div>
              <div className="md:col-span-7">
                <img
                  src={relaxfillV2}
                  alt="개발 중인 릴렉스필 V2 콘셉트 이미지"
                  width="1200"
                  height="696"
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-[2rem] bg-linen/[0.06] object-contain p-6 sm:p-10"
                />
              </div>
            </div>
          </section>
        )}

        {/* PROMISE */}
        <section id="promise" className="py-24 sm:py-32">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-xl">
              <Eyebrow>Our promise</Eyebrow>
              <h2 className="mt-6 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
                고니잠이 지키는 것들
              </h2>
            </div>
            <ul className="mt-14 grid gap-5 sm:grid-cols-2">
              {PROMISES.map((p) => (
                <li key={p.title} className="rounded-3xl border border-stone p-8">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="bg-sand py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <img src={logo} alt="" width="811" height="134" loading="lazy" className="mx-auto h-6 w-auto opacity-80" aria-hidden="true" />
            <p className="mt-10 text-lg leading-loose text-ink/80 sm:text-xl">
              복잡한 기술보다 편안한 경험을,
              <br />
              일시적인 자극보다 지속 가능한 수면 준비 습관을.
            </p>
            <p className="mt-10 text-2xl font-semibold tracking-tight sm:text-3xl">더 나은 수면으로 더 나은 일상을.</p>
            <div className="mt-12 flex justify-center">
              <StoreButton placement="closing">릴렉스필 만나보기</StoreButton>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone bg-linen py-14">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            <div>
              <img src={logo} alt="GONIZAM" width="811" height="134" loading="lazy" className="h-5 w-auto" />
              <p className="mt-4 text-sm text-muted">좋은 잠은 잠들기 전부터 시작됩니다.</p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
              <div>
                <p className="font-semibold">메뉴</p>
                <ul className="mt-3 space-y-2 text-muted">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="hover:text-ink">{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold">고객센터</p>
                <ul className="mt-3 space-y-2 text-muted">
                  {CONTACT.phone && (
                    <li><a href={`tel:${CONTACT.phone}`} className="hover:text-ink">{CONTACT.phone}</a></li>
                  )}
                  <li>{CONTACT.hours}</li>
                  <li><a href={`mailto:${CONTACT.email}`} className="break-all hover:text-ink">{CONTACT.email}</a></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">스토어</p>
                <ul className="mt-3 space-y-2 text-muted">
                  <li>
                    <a href={STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackPurchaseClick('footer')} className="inline-flex items-center gap-1 hover:text-ink">
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
            <p className="mt-4">© 2026 주식회사 블루모어. 고니잠(GONIZAM)은 주식회사 블루모어의 브랜드입니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
