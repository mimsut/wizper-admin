# 위즈퍼링 관리자 (wizper-admin)

사회적 고립 DP 연구 — 연구담당자용 관리자 대시보드. `claude.ai/design` 핸드오프(위즈퍼앱 디자인 시스템)를 Vite + React 웹으로 구현.

## 페이지

1. **참가자 관리** — 요약 지표 → 필터 → 참가자 테이블 · 상세(누적 응답/수집률, 전화 기록, 푸시 누적, 탈락 처리)
2. **EMA 현황** — 응답률 통계 → 필터 → 회차별 테이블
3. **센서 데이터 현황** — 수집 상태 요약 → 필터 → 센서별 상태 테이블
4. **푸시 알림** — 자동 발송 규칙 · 발송 이력
5. **연구 설정** — EMA 일정 · 알림 · 보상 · 이상 기준 · 센서 항목 · 변경 이력
6. **데이터 export** — 추출 범위 · 파일 구조 · 이력

> EMA·센서 현황의 드롭다운 필터 칩은 통계 카드 **아래**에 배치 (참가자 관리 페이지와 동일 흐름).

## 개발

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

## 디자인 토큰

`src/styles.css` → `src/tokens/{colors,typography,layout}.css`. 단일 강조색 `#5B50E5`, 보더리스·섀도리스 화이트 카드, Pretendard, tabular-nums 금액.
