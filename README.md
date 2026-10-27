# 고니잠(GONIZAM) 브랜드 홈페이지

React 19 + Vite + Tailwind CSS 4로 만든 원페이지 브랜드 사이트입니다. 문구와 구성은 「고니잠 브랜드북 v1.1」을 기준으로 합니다.

## 실행

```bash
npm install      # 처음 한 번
npm run dev      # http://localhost:5173 에서 미리보기
npm run build    # 배포용 파일을 dist/ 에 생성
```

## 자주 고치는 곳 (`src/App.jsx` 맨 위)

| 항목 | 상수 | 비고 |
|---|---|---|
| 구매 링크 | `STORE_URL` | 모든 구매 버튼이 이 주소로 연결 |
| 고객센터 | `CONTACT` | `phone`을 채우면 푸터에 전화번호 표시 |
| 사업자 정보 | `BUSINESS_INFO` | 값을 채운 항목만 표시 |
| V2 소개 섹션 | `SHOW_V2_PREVIEW` | `false`로 바꾸면 개발 중 제품 섹션 숨김 |
| 섹션 문구 | `DAY_TO_NIGHT`, `FEATURES`, `RITUAL`, `PROMISES` | |

색상은 `src/index.css`의 `@theme`(Quiet Wellness 팔레트), 이미지는 `src/assets/`에 있습니다.

## 문구 원칙 (브랜드북 요약)

- 잠을 강제로 유도하거나 치료를 약속하는 표현을 쓰지 않습니다.
- "두통 개선", "혈액순환 개선", "수면 촉진" 같은 효능 표현 대신 "편안하게", "이완", "수면 준비" 같은 경험 표현을 씁니다.
- V2 기능은 반드시 "개발 중", "목표"로 표기합니다.

## 배포

`main` 브랜치에 push하면 Vercel이 자동으로 배포합니다. 도메인: gonizam.com
