import React from 'react';
import { Button } from './components/core/Button.jsx';
import { Chip } from './components/core/Chip.jsx';
import { Icon } from './components/core/Icon.jsx';
import { ProgressBar } from './components/reward/ProgressBar.jsx';

/* ── 토스트 (목 액션 피드백) ── */
let _pushToast = () => {};
function toast(msg) { _pushToast(msg); }
function ToastHost() {
  const [items, setItems] = React.useState([]);
  const idRef = React.useRef(0);
  React.useEffect(() => {
    _pushToast = (msg) => {
      const id = ++idRef.current;
      setItems((x) => [...x, { id, msg }]);
      setTimeout(() => setItems((x) => x.filter((t) => t.id !== id)), 2400);
    };
    return () => { _pushToast = () => {}; };
  }, []);
  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 1000, alignItems: 'center' }}>
      {items.map((t) => (
        <div key={t.id} style={{ background: 'var(--wz-gray-900)', color: '#fff', font: '500 13px/1.4 var(--font-sans)', padding: '10px 16px', borderRadius: 12, boxShadow: '0 4px 16px rgba(25,31,40,.24)', maxWidth: 420 }}>{t.msg}</div>
      ))}
    </div>
  );
}

/* ── 드롭다운 ── */
function Dropdown({ label, options, value, onChange, minWidth = 0, align = 'left' }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const on = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', on);
    return () => document.removeEventListener('mousedown', on);
  }, [open]);
  const shown = value != null ? value : options[0];
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setOpen((o) => !o)} style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 12px', borderRadius: 10, background: open ? 'var(--color-primary-weak)' : 'var(--surface-card)', font: '500 13px/1 var(--font-sans)', color: open ? 'var(--color-primary)' : 'var(--text-body)', minWidth }}>
        {label ? <span style={{ color: 'var(--text-weak)' }}>{label} · </span> : null}{shown}
        <Icon name="chevron-down" size={14} color={open ? 'var(--color-primary)' : 'var(--text-weak)'} style={{ marginLeft: 'auto', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }} />
      </button>
      {open ? (
        <div style={{ position: 'absolute', top: 40, [align]: 0, minWidth: Math.max(160, minWidth), background: 'var(--surface-card)', borderRadius: 12, boxShadow: '0 4px 20px rgba(25,31,40,.16)', padding: 6, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {options.map((o) => (
            <button key={o} onClick={() => { onChange && onChange(o); setOpen(false); }} style={{ border: 'none', cursor: 'pointer', textAlign: 'left', padding: '8px 12px', borderRadius: 8, font: '500 13px/1 var(--font-sans)', background: o === shown ? 'var(--color-primary-weak)' : 'transparent', color: o === shown ? 'var(--color-primary)' : 'var(--text-body)', whiteSpace: 'nowrap' }}>{o}</button>
          ))}
        </div>
      ) : null}
    </span>
  );
}

/* ── 모달 ── */
function Modal({ title, sub, onClose, children, footer, width = 480 }) {
  React.useEffect(() => {
    const on = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', on);
    return () => document.removeEventListener('keydown', on);
  }, [onClose]);
  return (
    <div onMouseDown={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(25,31,40,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500, padding: 24 }}>
      <div onMouseDown={(e) => e.stopPropagation()} style={{ background: 'var(--surface-card)', borderRadius: 20, width, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)' }}>{title}</div>
            {sub ? <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)', marginTop: 2 }}>{sub}</div> : null}
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, display: 'inline-flex' }}><Icon name="x" size={20} color="var(--text-weak)" /></button>
        </div>
        {children}
        {footer ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>{footer}</div> : null}
      </div>
    </div>
  );
}
function LabeledField({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ font: 'var(--text-label)', color: 'var(--text-sub)' }}>{label}</span>
      {children}
    </div>
  );
}
const inputStyle = { height: 44, borderRadius: 10, border: '1px solid var(--divider)', background: 'var(--surface-card)', padding: '0 14px', font: '400 14px/1 var(--font-sans)', color: 'var(--text-strong)', outline: 'none', width: '100%' };

/* ── 데이터 ── */
const PART = [
  { id: 'WPR-101', age: 24, sex: '여', reg: '2026-08-10', day: 26, ema8: 7, cum: 88, sensor: 92, sensor14: 90, voice: 0, voiceCum: 92, push: [0, 0, 0], call: null, st: '정상', ring: true, sync: '3분 전', collect: '2분 전' },
  { id: 'WPR-102', age: 31, sex: '남', reg: '2026-08-10', day: 26, ema8: 6, cum: 79, sensor: 88, sensor14: 86, voice: 0, voiceCum: 85, push: [1, 0, 0], call: '08-27', st: '정상', ring: true, sync: '11분 전', collect: '11분 전' },
  { id: 'WPR-104', age: 22, sex: '여', reg: '2026-08-07', day: 29, ema8: 1, cum: 22, sensor: 18, sensor14: 21, voice: 4, voiceCum: 24, push: [3, 2, 3], call: '09-01', st: '탈락 검토', ring: false, sync: '38시간 전', collect: '41시간 전' },
  { id: 'WPR-107', age: 27, sex: '남', reg: '2026-08-13', day: 23, ema8: 1, cum: 41, sensor: 76, sensor14: 71, voice: 2, voiceCum: 55, push: [3, 0, 1], call: null, st: '전화 필요', ring: true, sync: '52분 전', collect: '52분 전' },
  { id: 'WPR-110', age: 45, sex: '여', reg: '2026-06-02', day: 92, ema8: 8, cum: 91, sensor: 95, sensor14: 93, voice: 0, voiceCum: 96, push: [0, 0, 0], call: null, st: '종료', ring: false, sync: '9월 1일', collect: '9월 1일' },
  { id: 'WPR-113', age: 19, sex: '여', reg: '2026-08-19', day: 17, ema8: 5, cum: 68, sensor: 45, sensor14: 58, voice: 1, voiceCum: 71, push: [0, 2, 0], call: '09-03', st: '전화 필요', ring: false, sync: '16시간 전', collect: '16시간 전' },
  { id: 'WPR-116', age: 35, sex: '남', reg: '2026-08-22', day: 14, ema8: 6, cum: 74, sensor: 83, sensor14: 80, voice: 0, voiceCum: 78, push: [1, 1, 0], call: null, st: '정상', ring: true, sync: '5분 전', collect: '4분 전' },
  { id: 'WPR-118', age: 29, sex: '여', reg: '2026-08-25', day: 11, ema8: 7, cum: 86, sensor: 97, sensor14: 94, voice: 0, voiceCum: 100, push: [0, 0, 0], call: null, st: '정상', ring: true, sync: '방금', collect: '방금' }
];
const ST_TONE = { '정상': 'success', '전화 필요': 'danger', '탈락 검토': 'coin', '탈락': 'neutral', '종료': 'neutral' };
const SENSORS = ['음성', '신체활동', '앱 사용', '화면 사용', '앱 로그', '위치', '통신'];

/* ── 공통 ── */
function StChip({ st }) { return <Chip tone={ST_TONE[st]}>{st}</Chip>; }
function PushCount({ v }) {
  const c = v >= 3 ? 'var(--color-danger)' : v === 2 ? 'var(--wz-amber-600)' : 'var(--color-success)';
  return <span style={{ display: 'inline-flex', minWidth: 20, height: 20, borderRadius: 6, alignItems: 'center', justifyContent: 'center', font: '600 12px/1 var(--font-sans)', color: c, background: v >= 3 ? 'var(--color-danger-weak)' : v === 2 ? 'var(--wz-amber-50)' : 'var(--color-success-weak)' }}>{v}</span>;
}
function Low({ children }) { return <span style={{ font: '600 11px/1 var(--font-sans)', color: 'var(--color-danger)', marginLeft: 5 }}>저조</span>; }
function Panel({ title, extra, children, style }) {
  return (
    <div style={{ background: 'var(--surface-card)', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      {title ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: 'var(--text-heading)' }}>{title}</span>{extra || null}
      </div> : null}
      {children}
    </div>
  );
}
function Table({ cols, rows, onRow }) {
  const th = { font: '600 12px/16px var(--font-sans)', color: 'var(--text-weak)', textAlign: 'left', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid var(--divider)' };
  const td = { font: '400 13px/18px var(--font-sans)', color: 'var(--text-body)', padding: '10px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid var(--divider)', verticalAlign: 'middle' };
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead><tr>{cols.map((c) => <th key={c} style={th}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} onClick={onRow ? () => onRow(i) : undefined} style={{ cursor: onRow ? 'pointer' : 'default' }}>
              {r.map((cell, j) => <td key={j} style={td}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Summary({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
      {items.map((s) => (
        <div key={s.label} style={{ background: s.hot ? 'var(--color-danger-weak)' : 'var(--surface-card)', borderRadius: 16, padding: '16px 20px' }}>
          <div style={{ font: 'var(--text-caption)', color: s.hot ? 'var(--color-danger)' : 'var(--text-sub)' }}>{s.label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
            <span style={{ font: '700 26px/32px var(--font-sans)', color: s.hot ? 'var(--color-danger)' : 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
            <span style={{ font: 'var(--text-caption)', color: s.hot ? 'var(--color-danger)' : 'var(--text-weak)' }}>{s.unit}</span>
          </div>
          {s.sub ? <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', marginTop: 2 }}>{s.sub}</div> : null}
        </div>
      ))}
    </div>
  );
}
function Filters({ extra }) {
  const [age, setAge] = React.useState('전체');
  const [sex, setSex] = React.useState('전체');
  const [status, setStatus] = React.useState('전체');
  const [period, setPeriod] = React.useState('전체');
  const [q, setQ] = React.useState('');
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Dropdown label="연령대" value={age} onChange={setAge} options={['전체', '10대', '20대', '30대', '40대 이상']} />
      <Dropdown label="성별" value={sex} onChange={setSex} options={['전체', '여성', '남성']} />
      <Dropdown label="참여 현황" value={status} onChange={setStatus} options={['전체', '정상', '전화 필요', '탈락 검토', '종료']} />
      <Dropdown label="기간" value={period} onChange={setPeriod} options={['전체', '최근 7일', '최근 2주', '최근 1개월', '전체 기간']} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px', borderRadius: 10, background: 'var(--surface-card)', minWidth: 200 }}>
        <Icon name="search" size={14} color="var(--text-weak)" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="연구 ID 검색"
          style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, minWidth: 0, font: '400 13px/1 var(--font-sans)', color: 'var(--text-strong)' }} />
      </span>
      <span style={{ flex: 1 }} />
      {extra || null}
    </div>
  );
}

/* ── 참가자 등록 모달 ── */
function RegisterModal({ onClose, onDone }) {
  const [birth, setBirth] = React.useState('');
  const [sex, setSex] = React.useState('여성');
  const [phone, setPhone] = React.useState('');
  const [reg, setReg] = React.useState('2026-09-04');
  const [ring, setRing] = React.useState('');
  const nextId = 'WPR-1' + (19 + 1).toString().padStart(2, '0');
  const valid = /^(19|20)\d{2}$/.test(birth) && /^01\d[-]?\d{3,4}[-]?\d{4}$/.test(phone.replace(/\s/g, ''));
  return (
    <Modal title="참가자 등록" sub="완료 시 연구 ID가 자동 발급돼요" onClose={onClose} width={520}
      footer={<>
        <Button variant="ghost" onClick={onClose}>취소</Button>
        <Button disabled={!valid} onClick={() => { onDone(nextId); onClose(); }}>{nextId}로 등록</Button>
      </>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        <LabeledField label="연구 ID (자동 발급)"><input value={nextId} disabled style={{ ...inputStyle, color: 'var(--text-weak)', background: 'var(--surface-sunken)' }} /></LabeledField>
        <LabeledField label="등록일"><input type="date" value={reg} onChange={(e) => setReg(e.target.value)} style={inputStyle} /></LabeledField>
        <LabeledField label="출생연도"><input value={birth} onChange={(e) => setBirth(e.target.value)} placeholder="예: 2002" inputMode="numeric" style={inputStyle} /></LabeledField>
        <LabeledField label="성별">
          <div style={{ display: 'flex', gap: 6 }}>
            {['여성', '남성'].map((g) => (
              <button key={g} onClick={() => setSex(g)} style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', cursor: 'pointer', font: '500 14px/1 var(--font-sans)', background: g === sex ? 'var(--color-primary-weak)' : 'var(--surface-sunken)', color: g === sex ? 'var(--color-primary)' : 'var(--text-sub)' }}>{g}</button>
            ))}
          </div>
        </LabeledField>
        <LabeledField label="연락처"><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" inputMode="tel" style={inputStyle} /></LabeledField>
        <LabeledField label="WIZPR RING ID (선택)"><input value={ring} onChange={(e) => setRing(e.target.value)} placeholder="예: A-3F27" style={inputStyle} /></LabeledField>
      </div>
      <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>등록 시 참가자에게 초대 문자와 앱 설치 링크가 발송돼요 · EMA 시간은 참가자가 온보딩에서 직접 설정</div>
    </Modal>
  );
}

/* ── 1. 참가자 관리 ── */
function Participants({ onDetail }) {
  const [register, setRegister] = React.useState(false);
  const rows = PART.map((p, i) => [
    <span style={{ font: '600 13px/18px var(--font-sans)', color: 'var(--text-strong)' }}>{p.id}<span style={{ font: '400 12px/16px var(--font-sans)', color: 'var(--text-weak)', marginLeft: 6 }}>{p.age} · {p.sex}</span></span>,
    p.reg, 'D+' + p.day,
    <span>{p.ema8}/8{p.ema8 <= 2 ? <Low /> : null}</span>,
    <span>{p.sensor}%{p.sensor <= 50 ? <Low /> : null}</span>,
    <span>{p.voice}회{p.voice >= 2 ? <Low /> : null}</span>,
    <span style={{ display: 'inline-flex', gap: 4 }}><PushCount v={p.push[0]} /><PushCount v={p.push[1]} /><PushCount v={p.push[2]} /></span>,
    p.call || <span style={{ color: 'var(--text-weak)' }}>최근 전화 없음</span>,
    <StChip st={p.st} />,
    <Button size="sm" variant="ghost" onClick={() => onDetail(i)}>상세보기</Button>
  ]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Summary items={[
        { label: '참여 중', value: 24, unit: '명', sub: '전체 등록 31명' },
        { label: 'EMA 저조', value: 3, unit: '명', sub: '최근 8회 중 2회 이하' },
        { label: '센서 저조', value: 2, unit: '명', sub: '전날 수집률 50% 이하' },
        { label: '음성 저조', value: 3, unit: '명', sub: '연속 2회 이상 미응답' },
        { label: '오늘 전화 필요', value: 2, unit: '명', sub: 'push count 3회 누적', hot: true },
        { label: '탈락 검토', value: 1, unit: '명', sub: '3개 기준 모두 충족', hot: true }
      ]} />
      <Filters extra={<Button size="sm" onClick={() => setRegister(true)}><Icon name="plus" size={14} color="#fff" />참가자 등록</Button>} />
      <Panel>
        <Table
          cols={['연구 ID', '등록일', '진행일', 'EMA (최근 8회)', '전날 센서 수집률', '음성 연속 미응답', '푸시 (EMA·DP·LLM)', '최근 전화', '참여 현황', '']}
          rows={rows} onRow={onDetail}
        />
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>행을 클릭하면 상세보기로 이동 · 저조 기준은 연구 설정에서 변경 가능</div>
      </Panel>
      {register ? <RegisterModal onClose={() => setRegister(false)} onDone={(id) => toast(id + ' 등록 완료 · 초대 문자 발송됨 (목업)')} /> : null}
    </div>
  );
}

/* ── 1b. 참가자 상세 ── */
function CumStat({ label, v, note }) {
  const bad = v <= 25;
  return (
    <div style={{ flex: 1, background: 'var(--surface-sunken)', borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>{label}</div>
      <div style={{ font: '700 24px/30px var(--font-sans)', color: bad ? 'var(--color-danger)' : 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{v}%</div>
      <div style={{ font: 'var(--text-micro)', color: bad ? 'var(--color-danger)' : 'var(--text-weak)' }}>{bad ? '탈락 기준(25% 이하) 충족' : note}</div>
    </div>
  );
}
const PERIODS = ['7일', '2주', '1개월', '전체'];
function periodBars(p, period) {
  const n = period === '7일' ? 7 : period === '2주' ? 14 : period === '1개월' ? 30 : 24;
  const seed = p.cum;
  const bars = Array.from({ length: n }, (_, i) => {
    const v = (Math.sin((i + 1) * (seed % 7 + 2)) + 1) / 2; // deterministic 0..1
    const on = v > (100 - seed) / 100 ? 1 : 0;
    return { on, h: on ? 40 + Math.round(v * 55) : 8 };
  });
  const labels = period === '7일' ? ['금', '토', '일', '월', '화', '수', '목']
    : period === '전체' ? bars.map((_, i) => (i % 4 === 0 ? 'W' + (i / 4 + 1) : ''))
    : bars.map((_, i) => (i % (n > 20 ? 5 : 2) === 0 ? String(i + 1) : ''));
  return { bars, labels };
}
function Detail({ p, onBack }) {
  const [period, setPeriod] = React.useState('7일');
  const { bars, labels } = periodBars(p, period);
  const [calls, setCalls] = React.useState([
    { date: '09-01 14:20', staff: '김연구', ok: true, memo: 'EMA 저조 사유 확인 · 병원 입원으로 1주 참여 어려움. 복귀 후 재개 안내' },
    { date: '08-25 11:05', staff: '박연구', ok: false, memo: '문자로 참여 안내 발송' },
    { date: '08-19 16:40', staff: '김연구', ok: true, memo: '링 충전 문제 해결 안내 · DP push count 초기화' }
  ]);
  const [callModal, setCallModal] = React.useState(false);
  const [memos, setMemos] = React.useState([{ date: '09-01', by: '김연구', text: '기기 특이사항: 구형 단말(Android 11)로 백그라운드 종료 잦음. 배터리 설정 안내 완료' }]);
  const [memoDraft, setMemoDraft] = React.useState('');
  const addMemo = () => { if (!memoDraft.trim()) return; setMemos((m) => [{ date: '09-04', by: 'admin_kim', text: memoDraft.trim() }, ...m]); setMemoDraft(''); toast('메모 저장됨'); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Button variant="ghost" size="sm" onClick={onBack}><Icon name="arrow-left" size={16} />목록으로</Button>
        <span style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)' }}>{p.id}</span>
        <span style={{ font: 'var(--text-body2)', color: 'var(--text-sub)' }}>{p.age}세 · {p.sex} · 등록 {p.reg} · D+{p.day}</span>
        <StChip st={p.st} />
        <span style={{ flex: 1 }} />
        <span style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>연락처 010-••••-4417</span>
        <Button size="sm" variant="secondary" onClick={() => setCallModal(true)}><Icon name="phone" size={14} />전화 기록 추가</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Panel title="누적 응답 · 수집률" extra={<span style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>탈락 기준: 각 25% 이하 · EMA/음성 D+22~, 센서 D+15~ 판정</span>}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <CumStat label="누적 EMA 응답률" v={p.cum} note="발송 회차 중 완료 비율" />
              <CumStat label="누적 센서 수집률" v={p.sensor14} note="전날 수집률 14일 평균" />
              <CumStat label="누적 음성 응답률" v={p.voiceCum} note="발화 과제 완료 비율" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ font: 'var(--text-label)', color: 'var(--text-body)' }}>{period === '전체' ? '전체 기간' : '최근 ' + period} · EMA 참여</span>
                <span style={{ display: 'inline-flex', gap: 2, background: 'var(--surface-sunken)', borderRadius: 8, padding: 2 }}>
                  {PERIODS.map((pd) => (
                    <button key={pd} onClick={() => setPeriod(pd)} style={{ border: 'none', cursor: 'pointer', borderRadius: 6, padding: '4px 10px', font: '600 12px/1 var(--font-sans)', background: pd === period ? 'var(--surface-card)' : 'transparent', color: pd === period ? 'var(--color-primary)' : 'var(--text-weak)', boxShadow: pd === period ? '0 1px 2px rgba(25,31,40,.1)' : 'none' }}>{pd}</button>
                  ))}
                </span>
              </div>
              <div style={{ display: 'flex', gap: bars.length > 20 ? 3 : 8, alignItems: 'flex-end' }}>
                {bars.map((b, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 0 }}>
                    <div style={{ width: '100%', height: 44, borderRadius: 4, background: b.on ? 'var(--color-primary-weak)' : 'var(--surface-sunken)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: b.h + '%', background: b.on ? 'var(--color-primary)' : 'var(--wz-gray-200)' }} />
                    </div>
                    <span style={{ font: '400 10px/1 var(--font-sans)', color: 'var(--text-weak)', whiteSpace: 'nowrap' }}>{labels[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
          <Panel title="전화 기록" extra={<Button size="sm" variant="ghost" onClick={() => setCallModal(true)}><Icon name="plus" size={13} />기록 추가</Button>}>
            <Table cols={['일자', '담당자', '연결', '메모']} rows={calls.map((c) => [
              c.date, c.staff, c.ok ? <Chip tone="success">연결됨</Chip> : <Chip tone="neutral">부재중</Chip>,
              <span style={{ whiteSpace: 'normal' }}>{c.memo}</span>
            ])} />
          </Panel>
          <Panel title="메모">
            {memos.map((m, i) => (
              <div key={i} style={{ font: 'var(--text-body2)', color: 'var(--text-body)', background: 'var(--surface-sunken)', borderRadius: 10, padding: '10px 14px' }}>
                {m.date} · {m.text} · {m.by}
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={memoDraft} onChange={(e) => setMemoDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') addMemo(); }}
                placeholder="참가자 특이사항을 기록해 두세요"
                style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid var(--divider)', background: 'var(--surface-card)', padding: '0 14px', font: 'var(--text-caption)', color: 'var(--text-strong)', outline: 'none', minWidth: 0 }} />
              <Button size="sm" variant="secondary" onClick={addMemo}>작성</Button>
            </div>
          </Panel>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Panel title="푸시 알림 누적">
            {[['EMA 독려', p.push[0]], ['DP (센서) 독려', p.push[1]], ['LLM (음성) 독려', p.push[2]]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flex: 1, font: 'var(--text-body2)', color: 'var(--text-body)' }}>{l}</span>
                <PushCount v={v} />
                {v >= 3 ? <span style={{ font: 'var(--text-micro)', color: 'var(--color-danger)' }}>전화 연락 대상</span> : null}
              </div>
            ))}
            <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>최근 발송 09-03 08:00 · EMA 저조 예약 메시지 · 전화 후 해당 count 초기화</div>
          </Panel>
          <Panel title="탈락 처리" style={{ outline: '1.5px solid var(--color-danger-weak)' }}>
            {[['누적 EMA 응답률 25% 이하', p.cum <= 25], ['누적 센서 수집률 25% 이하', p.sensor14 <= 25], ['누적 음성 응답률 25% 이하', p.voiceCum <= 25]].map(([l, ok]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name={ok ? 'circle-check-big' : 'circle'} size={16} color={ok ? 'var(--color-danger)' : 'var(--text-disabled)'} />
                <span style={{ font: 'var(--text-body2)', color: ok ? 'var(--text-strong)' : 'var(--text-sub)' }}>{l}</span>
              </div>
            ))}
            <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>3개 기준을 모두 충족한 다음 날부터 처리 가능 · 버튼 클릭 → 코드 입력 → 재확인 후 확정 · 확정 시 수집 즉시 중단(되돌릴 수 없음)</div>
            <Button size="md" style={{ background: 'var(--color-danger)', width: '100%' }} disabled={!(p.cum <= 25 && p.sensor14 <= 25 && p.voiceCum <= 25)} onClick={() => toast('탈락 처리 · 코드 입력 → 재확인 단계 (목업, 실제 중단 아님)')}>탈락 처리</Button>
          </Panel>
        </div>
      </div>
      {callModal ? (
        <CallModal pid={p.id} onClose={() => setCallModal(false)}
          onSave={(rec) => { setCalls((c) => [rec, ...c]); setCallModal(false); toast(p.id + ' 전화 기록 추가됨'); }} />
      ) : null}
    </div>
  );
}
function CallModal({ pid, onClose, onSave }) {
  const [staff, setStaff] = React.useState('김연구');
  const [ok, setOk] = React.useState(true);
  const [memo, setMemo] = React.useState('');
  const now = '09-04 ' + '14:0' + (2);
  return (
    <Modal title="전화 기록 추가" sub={pid + ' · ' + now} onClose={onClose} width={520}
      footer={<>
        <Button variant="ghost" onClick={onClose}>취소</Button>
        <Button disabled={!memo.trim()} onClick={() => onSave({ date: now, staff, ok, memo: memo.trim() })}>저장</Button>
      </>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        <LabeledField label="담당자">
          <Dropdown value={staff} onChange={setStaff} options={['김연구', '박연구', '이연구', 'admin_kim', 'admin_park']} minWidth={180} />
        </LabeledField>
        <LabeledField label="연결 여부">
          <div style={{ display: 'flex', gap: 6 }}>
            {[['연결됨', true], ['부재중', false]].map(([l, v]) => (
              <button key={l} onClick={() => setOk(v)} style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', cursor: 'pointer', font: '500 14px/1 var(--font-sans)', background: ok === v ? 'var(--color-primary-weak)' : 'var(--surface-sunken)', color: ok === v ? 'var(--color-primary)' : 'var(--text-sub)' }}>{l}</button>
            ))}
          </div>
        </LabeledField>
      </div>
      <LabeledField label="메모">
        <textarea value={memo} onChange={(e) => setMemo(e.target.value)} rows={4} placeholder="통화 내용 · 참여 안내 · 조치 사항을 기록하세요"
          style={{ ...inputStyle, height: 'auto', padding: '12px 14px', lineHeight: '1.5', resize: 'vertical', fontFamily: 'var(--font-sans)' }} />
      </LabeledField>
      <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>연결됨으로 저장 시 push count가 초기화돼요 (목업)</div>
    </Modal>
  );
}

/* ── 2. EMA 현황 ── */
function EmaStatus() {
  const rounds = [82, 76, 71, 64];
  const rows = PART.map((p) => [
    <span style={{ font: '600 13px/18px var(--font-sans)', color: 'var(--text-strong)' }}>{p.id}</span>,
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{p.cum}%{p.cum <= 25 ? <Low /> : null}</span>,
    <span>{p.ema8}/8{p.ema8 <= 2 ? <Low /> : null}</span>,
    <span style={{ color: p.voice + (p.ema8 <= 1 ? 3 : 0) >= 3 ? 'var(--color-danger)' : 'var(--text-body)' }}>{p.ema8 <= 1 ? 5 : p.ema8 <= 5 ? 1 : 0}회</span>,
    ['10:00', '09:00', '11:00', '10:00', '08:00', '12:00', '10:00', '09:00'][PART.indexOf(p)],
    ...[0, 1, 2, 3].map((r) => <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--text-sub)' }}>{Math.max(8, Math.min(98, p.cum + [7, 2, -4, -9][r]))}%</span>),
    <StChip st={p.st} />
  ]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <div style={{ background: 'var(--surface-card)', borderRadius: 16, padding: '16px 20px' }}>
          <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>전체 EMA 응답률</div>
          <div style={{ font: '700 30px/38px var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}>73%</div>
          <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>응답 623 / 발송 853회 · 필터 대상 기준 재계산</div>
        </div>
        <div onClick={() => toast('저응답 참가자만 필터링 (누적 25% 이하 1명) · 목업')} style={{ background: 'var(--color-danger-weak)', borderRadius: 16, padding: '16px 20px', cursor: 'pointer' }}>
          <div style={{ font: 'var(--text-caption)', color: 'var(--color-danger)' }}>저응답 참가자 (누적 25% 이하)</div>
          <div style={{ font: '700 30px/38px var(--font-sans)', color: 'var(--color-danger)', fontVariantNumeric: 'tabular-nums' }}>1명</div>
          <div style={{ font: 'var(--text-micro)', color: 'var(--color-danger)' }}>클릭 시 저응답 참가자만 표시</div>
        </div>
        <div style={{ background: 'var(--surface-card)', borderRadius: 16, padding: '16px 20px' }}>
          <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)', marginBottom: 10 }}>회차별 응답률</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {rounds.map((v, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', width: 78 }}>{(i + 1) + '회차 ' + ['아침', '오후', '저녁', '밤'][i]}</span>
                <div style={{ flex: 1 }}><ProgressBar value={v} max={100} height={6} color={i === 3 ? 'var(--wz-amber-600)' : 'var(--color-primary)'} /></div>
                <span style={{ font: '600 12px/1 var(--font-sans)', fontVariantNumeric: 'tabular-nums', width: 32, textAlign: 'right' }}>{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Filters />
      <Panel>
        <Table cols={['연구 ID', '누적 응답률', '최근 8회', '연속 미응답', '1회차 시간', '1회차', '2회차', '3회차', '4회차', '참여 현황']} rows={rows} />
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>저응답 판정 기준 · 회차 구성 · 1회차 시간 범위는 연구 설정값 기반 (하드코딩 없음)</div>
      </Panel>
    </div>
  );
}

/* ── 3. 센서 데이터 현황 ── */
function SensorDot({ st }) {
  const map = { ok: ['var(--color-success)', '수집 중'], bad: ['var(--color-danger)', '결측 진행 중'], none: ['var(--wz-gray-300)', '미동의'] };
  return <span title={map[st][1]} style={{ width: 10, height: 10, borderRadius: 5, background: map[st][0], display: 'inline-block' }} />;
}
function SensorStatus() {
  const states = (p) => SENSORS.map((s, i) => {
    if (p.st === '종료') return 'none';
    if (!p.ring && i === 0) return 'bad';
    if (p.sensor <= 50 && i >= 4) return 'bad';
    if (p.id === 'WPR-116' && i === 6) return 'none';
    return 'ok';
  });
  const reason = (p) => p.id === 'WPR-104' ? '링 연결 끊김 38시간 · 서버 동기화 중단' : p.id === 'WPR-113' ? '배터리 제한으로 백그라운드 종료 추정' : p.id === 'WPR-107' ? '야간 시간대 위치 결측 반복' : null;
  const rows = PART.filter((p) => p.st !== '종료').map((p) => [
    <span style={{ font: '600 13px/18px var(--font-sans)', color: 'var(--text-strong)' }}>{p.id}</span>,
    <StChip st={p.st} />,
    p.ring ? <Chip tone="success"><Icon name="circle-dot" size={11} />연결됨</Chip> : <Chip tone="danger">연결 끊김</Chip>,
    p.collect, p.sync,
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{p.sensor}%{p.sensor <= 50 ? <Low /> : null}</span>,
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{p.sensor14}%</span>,
    <span style={{ display: 'inline-flex', gap: 5 }}>{states(p).map((s, i) => <SensorDot key={i} st={s} />)}</span>,
    reason(p) ? <span style={{ color: 'var(--color-danger)', whiteSpace: 'normal', font: '500 12px/16px var(--font-sans)' }}>{reason(p)}</span> : <span style={{ color: 'var(--text-weak)' }}>-</span>
  ]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Summary items={[
        { label: '수집 정상', value: 21, unit: '명' },
        { label: '점검 필요', value: 3, unit: '명', sub: '기준: 미수집 16시간 · 수집률 50% · 링 끊김 12시간', hot: true },
        { label: '링 연결 끊김', value: 2, unit: '명' },
        { label: '어제 평균 수집률', value: '84', unit: '%' }
      ]} />
      <Filters />
      <Panel extra={null}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', font: 'var(--text-micro)', color: 'var(--text-weak)' }}>
          <span>센서 순서: {SENSORS.join(' · ')}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><SensorDot st="ok" />수집 중</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><SensorDot st="bad" />결측 진행 중</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><SensorDot st="none" />미동의/중단</span>
        </div>
        <Table cols={['연구 ID', '참여 현황', '링 연결', '마지막 수집', '마지막 동기화', '전날 수집률', '누적 (14일)', '센서별 상태', '점검 필요 사유']} rows={rows} />
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>점검 필요 사유는 연구 설정의 이상 기준 충족 시 자동 생성</div>
      </Panel>
    </div>
  );
}

/* ── 4. 푸시 알림 관리 ── */
function PushAdmin() {
  const [rules, setRules] = React.useState([
    { on: true, name: '1회차 참여 알림 (기본)', when: '오전 8시 예약 · EMA 시행일', msg: '오늘은 설문 및 대화과제 참여가 가능한 날입니다. 오늘 4번의 설문과 1번의 대화과제를 모두 참여하시면 2,500원이 지급됩니다.' },
    { on: true, name: 'EMA 저조 독려 (+EMA count)', when: '오전 8시 · 최근 8회 중 2회 이하 응답', msg: '오늘은 설문 및 대화과제 참여가 가능한 날입니다. 지난 8회의 설문 중 총 {n}회 참여하셨습니다. 원활한 연구 진행을 위해 성실히 참여해주시면 감사하겠습니다!' },
    { on: true, name: '센서 저조 독려 (+DP count)', when: '오전 8시 · 센서 저조 2일 연속', msg: '어제의 센서 수집이 원활하지 않았습니다. 다음 안내에 따라 조치하신 후 설문에 참여해 주세요. → 문제 항목 설정 화면 링크 포함' },
    { on: true, name: '음성 과제 독려 (+LLM count)', when: '오전 8시 · 대화 과제 2회 이상 연속 미응답', msg: '최근 대화형 과제에 {n}회 연속 참여하지 않으셨습니다. 잊지 말고 참여해 주세요!' },
    { on: true, name: '마감 전 리마인더', when: '각 회차 T+30분 · 미응답 시 1회 (최대 4회/일)', msg: '이번 회차 EMA 응답 가능 시간이 30분밖에 남지 않았습니다. 응답 시간이 지나면 이번 회차는 참여가 어려우니, 잊지 마시고 꼭 확인 부탁드립니다.' }
  ]);
  const toggle = (i) => setRules((rs) => rs.map((r, j) => j === i ? { ...r, on: !r.on } : r));
  const [edit, setEdit] = React.useState(null);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Panel title="자동 발송 규칙" extra={<Button size="sm" variant="secondary" onClick={() => toast('규칙 추가 · 새 자동 발송 규칙 (목업)')}><Icon name="plus" size={14} />규칙 추가</Button>}>
          {rules.map((r, ri) => (
            <div key={r.name} style={{ borderRadius: 12, background: 'var(--surface-sunken)', padding: '14px 16px', display: 'flex', gap: 14 }}>
              <span onClick={() => { toggle(ri); toast(r.name + ' ' + (r.on ? '끔' : '켬')); }} style={{ width: 40, height: 24, borderRadius: 12, cursor: 'pointer', background: r.on ? 'var(--color-primary)' : 'var(--wz-gray-200)', position: 'relative', flexShrink: 0, marginTop: 2, transition: 'background .15s' }}>
                <span style={{ position: 'absolute', top: 3, left: r.on ? 19 : 3, width: 18, height: 18, borderRadius: 9, background: '#fff', transition: 'left .15s' }} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ font: '600 14px/20px var(--font-sans)' }}>{r.name}</span>
                  <span style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>{r.when}</span>
                  <span style={{ flex: 1 }} />
                  <Button size="sm" variant="ghost" onClick={() => setEdit(ri)}><Icon name="pencil" size={13} />문구 수정</Button>
                </div>
                <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)', marginTop: 4 }}>{r.msg}</div>
              </div>
            </div>
          ))}
          <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>T+4h 마감 시 발송 없음 · missed +1 / count 3 누적 시 자동 발송 대신 '전화 필요'로 표시 · 발송 시점·조건·문구 모두 설정값</div>
        </Panel>
      </div>
      <Panel title="발송 이력">
        <Table cols={['일시', '대상', '유형', '결과']} rows={[
          ['09-04 08:00', '전체 (24)', '1회차 참여 알림', <Chip tone="success">발송됨</Chip>],
          ['09-04 08:00', 'WPR-107', 'EMA 저조 독려', <Chip tone="success">발송됨</Chip>],
          ['09-04 08:00', 'WPR-113', '센서 저조 독려', <Chip tone="success">발송됨</Chip>],
          ['09-03 14:30', '미응답 6명', '마감 전 리마인더', <Chip tone="success">발송됨</Chip>],
          ['09-03 08:00', 'WPR-104', '음성 과제 독려', <Chip tone="danger">미수신</Chip>],
          ['09-02 10:30', '미응답 4명', '마감 전 리마인더', <Chip tone="success">발송됨</Chip>]
        ]} />
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>참가자 문의 대응용 · 참가자별 이력은 상세보기에서 확인</div>
      </Panel>
      {edit !== null ? (
        <MsgEditModal rule={rules[edit]} onClose={() => setEdit(null)}
          onSave={(msg) => { setRules((rs) => rs.map((r, j) => j === edit ? { ...r, msg } : r)); setEdit(null); toast(rules[edit].name + ' 문구 저장됨'); }} />
      ) : null}
    </div>
  );
}
function MsgEditModal({ rule, onClose, onSave }) {
  const [msg, setMsg] = React.useState(rule.msg);
  const vars = ['{n}'];
  return (
    <Modal title="문구 수정" sub={rule.name + ' · ' + rule.when} onClose={onClose} width={560}
      footer={<>
        <Button variant="ghost" onClick={onClose}>취소</Button>
        <Button disabled={!msg.trim()} onClick={() => onSave(msg.trim())}>저장</Button>
      </>}>
      <LabeledField label="알림 문구">
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={5}
          style={{ ...inputStyle, height: 'auto', padding: '12px 14px', lineHeight: '1.5', resize: 'vertical', fontFamily: 'var(--font-sans)' }} />
      </LabeledField>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>치환 변수:</span>
        {vars.map((v) => (
          <button key={v} onClick={() => setMsg((m) => m + v)} style={{ border: '1px solid var(--divider)', background: 'var(--surface-sunken)', cursor: 'pointer', borderRadius: 6, padding: '3px 8px', font: '600 12px/1 var(--font-sans)', color: 'var(--color-primary)' }}>{v}</button>
        ))}
        <span style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>· {'{n}'} = 미응답/참여 횟수로 발송 시 자동 치환</span>
      </div>
      <div style={{ background: 'var(--color-primary-tint)', borderRadius: 12, padding: '12px 14px' }}>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-sub)', marginBottom: 4 }}>미리보기</div>
        <div style={{ font: 'var(--text-body2)', color: 'var(--text-body)' }}>{msg.replace(/\{n\}/g, '3')}</div>
      </div>
    </Modal>
  );
}

/* ── 5. 연구 설정 ── */
function SettingGroup({ icon, title, rows, onChange }) {
  const [vals, setVals] = React.useState(() => Object.fromEntries(rows.map(([l, v]) => [l, v])));
  const [editing, setEditing] = React.useState(null);
  return (
    <Panel title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name={icon} size={16} color="var(--color-primary)" />{title}</span>}>
      {rows.map(([l]) => (
        <div key={l} onClick={() => setEditing(l)} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', margin: '0 -8px', padding: '4px 8px', borderRadius: 8 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-sunken)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
          <span style={{ flex: 1, minWidth: 0, font: 'var(--text-body2)', color: 'var(--text-body)', wordBreak: 'keep-all' }}>{l}</span>
          <span style={{ font: '600 13px/18px var(--font-sans)', color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', flexShrink: 0, textAlign: 'right' }}>{vals[l]}</span>
          <Icon name="pencil" size={13} color="var(--text-weak)" style={{ flexShrink: 0 }} />
        </div>
      ))}
      {editing !== null ? (
        <SettingEditModal group={title} label={editing} current={vals[editing]} onClose={() => setEditing(null)}
          onSave={(nv, when, who) => { setVals((x) => ({ ...x, [editing]: nv })); setEditing(null); onChange && onChange({ label: editing, prev: vals[editing], next: nv, when, who }); toast(editing + ' → ' + nv + ' 저장 (' + when + ' · ' + who + ')'); }} />
      ) : null}
    </Panel>
  );
}
function SettingEditModal({ group, label, current, onClose, onSave }) {
  const [val, setVal] = React.useState(current);
  const [when, setWhen] = React.useState('즉시');
  const [who, setWho] = React.useState('전체');
  const changed = val.trim() && val !== current;
  return (
    <Modal title="설정 변경" sub={group + ' · ' + label} onClose={onClose} width={480}
      footer={<>
        <Button variant="ghost" onClick={onClose}>취소</Button>
        <Button disabled={!changed} onClick={() => onSave(val.trim(), when, who)}>변경 적용</Button>
      </>}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', marginBottom: 4 }}>현재 적용값</div>
          <div style={{ height: 44, borderRadius: 10, background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', padding: '0 14px', font: '600 14px/1 var(--font-sans)', color: 'var(--text-sub)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current}</div>
        </div>
        <Icon name="arrow-left" size={16} color="var(--text-weak)" style={{ transform: 'rotate(180deg)', flexShrink: 0, marginBottom: 12 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: 'var(--text-micro)', color: 'var(--color-primary)', marginBottom: 4 }}>변경 예정값</div>
          <input value={val} onChange={(e) => setVal(e.target.value)} style={{ ...inputStyle, height: 44, font: '600 14px/1 var(--font-sans)', border: 'none', outline: '1.5px solid var(--color-primary)' }} />
        </div>
      </div>
      <LabeledField label="적용 시점">
        <div style={{ display: 'flex', gap: 6 }}>
          {['즉시', '지정 일시', '다음 회차'].map((o) => (
            <button key={o} onClick={() => setWhen(o)} style={{ flex: 1, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', font: '500 13px/1 var(--font-sans)', background: o === when ? 'var(--color-primary-weak)' : 'var(--surface-sunken)', color: o === when ? 'var(--color-primary)' : 'var(--text-sub)' }}>{o}</button>
          ))}
        </div>
      </LabeledField>
      <LabeledField label="적용 대상">
        <div style={{ display: 'flex', gap: 6 }}>
          {['전체', '기존 참가자', '신규 참가자'].map((o) => (
            <button key={o} onClick={() => setWho(o)} style={{ flex: 1, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', font: '500 13px/1 var(--font-sans)', background: o === who ? 'var(--color-primary-weak)' : 'var(--surface-sunken)', color: o === who ? 'var(--color-primary)' : 'var(--text-sub)' }}>{o}</button>
          ))}
        </div>
      </LabeledField>
      <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>변경 이력은 삭제할 수 없어요 · 수집 조건 해석의 근거로 보존돼요 · 변경분은 앱 업데이트 없이 자동 반영</div>
    </Modal>
  );
}
function Settings() {
  const [history, setHistory] = React.useState([
    ['08-29 10:12', '보상 · 일일 보너스', '500원', '1,000원', '즉시 · 전체', 'admin_kim'],
    ['08-21 17:40', '이상 기준 · 센서 미수집 판단', '20시간', '16시간', '즉시 · 전체', 'admin_park'],
    ['08-10 09:00', 'EMA 일정 · 참여 가능 시간', '90분', '60분', '신규 참가자', 'admin_kim']
  ]);
  const log = (g) => (c) => setHistory((h) => [['09-04 14:02', g.replace(/^\d+ · /, '') + ' · ' + c.label, c.prev, c.next, c.when + ' · ' + c.who, 'admin_kim'], ...h]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: 'var(--color-primary-tint)', borderRadius: 16, padding: '14px 20px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <Icon name="info" size={16} color="var(--color-primary)" />
        <span style={{ font: 'var(--text-caption)', color: 'var(--text-body)' }}>모든 값은 저장 시 <b>현재 적용값 → 변경 예정값</b> 비교, <b>적용 시점</b>(즉시 / 지정 일시 / 다음 회차)과 <b>적용 대상</b>(전체 / 기존 / 신규 참가자)을 함께 지정합니다. 변경분은 앱 업데이트 없이 자동 반영돼요.</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, alignItems: 'stretch' }}>
        <SettingGroup icon="calendar-clock" title="1 · EMA 일정" onChange={log('EMA 일정')} rows={[['시행 주기', '3일 간격'], ['일일 시행 횟수', '4회'], ['회차 간 간격', '4시간'], ['1회차 시작 범위', '08:00~12:00'], ['회차 시각 고정', '고정 (참가자 변경 불가)'], ['참여 가능 시간', '알림 후 60분']]} />
        <SettingGroup icon="bell-ring" title="2 · 리마인드 알림" onChange={log('리마인드 알림')} rows={[['미응답 리마인드', '사용'], ['발송 시점', '마감 30분 전'], ['자기보고 설문 적용', '적용'], ['음성 과제 적용', '적용']]} />
        <SettingGroup icon="message-square" title="3 · 푸시 알림" onChange={log('푸시 알림')} rows={[['활성 규칙', '5개'], ['발송 조건 · 문구', '푸시 알림 관리에서 편집'], ['전화 필요 기준', 'count 3회 누적']]} />
        <SettingGroup icon="mic" title="4 · 음성 발화 과제" onChange={log('음성 발화 과제')} rows={[['LLM 최대 추가 질문', '3턴'], ['문항 제시 순서', '균형 순환'], ['활성 카테고리', '6 / 6개'], ['최소 · 최대 발화', '20초 · 2분']]} />
        <SettingGroup icon="coins" title="5 · 보상" onChange={log('보상')} rows={[['자기보고 설문 1회', '250원'], ['음성 과제 1회', '500원'], ['일일 보너스 조건', '당일 과제 전체 완료'], ['일일 보너스 금액', '1,000원'], ['지급 방식', '연구 종료 후 일괄']]} />
        <SettingGroup icon="triangle-alert" title="6 · 참여 · 수집 이상 기준" onChange={log('이상 기준')} rows={[['EMA 저조 판정', '최근 8회 중 2회 이하'], ['연속 미응답 경고', '3회'], ['센서 미수집 판단', '16시간'], ['수집률 경고 기준', '전날 50% 미만'], ['링 연결 이상', '12시간 지속'], ['탈락 검토 기준', '누적 25% 이하 × 3종']]} />
        <SettingGroup icon="radio" title="7 · 센서 수집 항목" onChange={log('센서 수집 항목')} rows={[['필수 · 음성/신체활동/앱사용/화면/앱로그', '수집 중'], ['선택 · 위치 정보', '수집 중'], ['선택 · 통신 메타데이터', '수집 중'], ['키보드 동역학', '개발 제외 (1차년도)']]} />
        <Panel title="변경 이력" style={{ gridColumn: '1 / -1' }}>
          <Table cols={['변경 일시', '항목', '이전 값', '변경 값', '적용', '변경자']} rows={history} />
          <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>변경 이력은 삭제할 수 없어요 · 수집 조건 해석의 근거로 보존됩니다</div>
        </Panel>
      </div>
    </div>
  );
}

/* ── 6. 데이터 export ── */
function Check({ label, sub, on = true }) {
  const [checked, setChecked] = React.useState(on);
  return (
    <div onClick={() => setChecked((c) => !c)} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
      <Icon name={checked ? 'square-check-big' : 'square'} size={18} color={checked ? 'var(--color-primary)' : 'var(--text-disabled)'} style={{ marginTop: 1 }} />
      <div>
        <div style={{ font: 'var(--text-body2)', color: 'var(--text-strong)' }}>{label}</div>
        {sub ? <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>{sub}</div> : null}
      </div>
    </div>
  );
}
function Export() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Panel title="추출 범위">
          <Filters />
          <div style={{ font: 'var(--text-body2)', color: 'var(--text-body)' }}>현재 필터 대상 <b>24명</b> · 기간 2026-08-07 ~ 2026-09-04</div>
          <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>참가자 관리에서 필터한 대상만 선택 추출 가능</div>
        </Panel>
        <Panel title="파일 구조 (연구실 DP 형식과 동일)">
          <Check label="참가자별 센서 데이터" sub="PID_센서명.csv" />
          <Check label="참가자별 EMA 데이터" sub="PID_ema_responses.csv" />
          <Check label="센서별 통합 파일" sub="all_센서명.csv" />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <Check label="코드북 포함" sub="변수 정의 · 단위 · 산출 방식" />
          <Check label="데이터 품질 로그 포함" sub="수집 정상 여부 · 결측 사유" />
        </Panel>
        <Button size="lg" style={{ width: '100%' }} onClick={() => toast('데이터 추출 시작 · wzp_export_0904.zip 생성 중 (목업)')}><Icon name="download" size={16} color="#fff" />24명 데이터 추출</Button>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', textAlign: 'center' }}>스키마 v1.3 · 공통 키: 연구 ID · 날짜/시각 · 회차 · 변수 · 추출 즉시 이력 기록 (IRB 자료 관리 요건)</div>
      </div>
      <Panel title="추출 이력">
        <Table cols={['일시', '수행자', '범위', '스키마', '파일']} rows={[
          ['09-01 15:02', 'admin_kim', '전체 31명 · ~08-31', 'v1.3', 'wzp_export_0901.zip'],
          ['08-24 11:40', 'admin_park', '필터 12명 (EMA 저조) · ~08-23', 'v1.3', 'wzp_export_0824.zip'],
          ['08-17 09:30', 'admin_kim', '전체 28명 · ~08-16', 'v1.2', 'wzp_export_0817.zip']
        ]} />
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>언제 · 누가 · 어떤 범위를 내려받았는지 보존 · 삭제 불가</div>
      </Panel>
    </div>
  );
}

/* ── 루트 ── */
const NAV = [
  ['users', '참가자 관리'], ['clipboard-list', 'EMA 현황'], ['activity', '센서 데이터 현황'],
  ['bell-ring', '푸시 알림'], ['settings-2', '연구 설정'], ['download', '데이터 export']
];
export function Admin() {
  const [tab, setTab] = React.useState(0);
  const [detail, setDetail] = React.useState(null);
  const [study, setStudy] = React.useState('사회적 고립 1차 (2026)');
  const body = detail !== null && tab === 0
    ? <Detail p={PART[detail]} onBack={() => setDetail(null)} />
    : [<Participants onDetail={setDetail} />, <EmaStatus />, <SensorStatus />, <PushAdmin />, <Settings />, <Export />][tab];
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-sans)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-body)', background: 'var(--surface-bg)' }}>
      <div style={{ width: 224, flexShrink: 0, background: 'var(--surface-card)', borderRight: '1px solid var(--divider)', padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 2, position: 'sticky', top: 0, height: '100dvh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 10px 18px' }}>
          <span style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="audio-waveform" size={18} color="#fff" />
          </span>
          <div>
            <div style={{ font: '700 14px/18px var(--font-sans)' }}>위즈퍼링 관리자</div>
            <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>사회적 고립 DP 연구</div>
          </div>
        </div>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', padding: '0 10px 6px' }}>과제 선택</div>
        <div style={{ margin: '0 6px 14px' }}>
          <Dropdown value={study} onChange={(s) => { setStudy(s); toast('과제 전환 · ' + s + ' (목업)'); }}
            options={['사회적 고립 1차 (2026)', '사회적 고립 2차 (2027)', '수면-정서 파일럿 (2026)']} minWidth={196} />
        </div>
        {NAV.map(([ic, l], i) => (
          <div key={l} onClick={() => { setTab(i); setDetail(null); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', background: tab === i ? 'var(--color-primary-weak)' : 'transparent', color: tab === i ? 'var(--color-primary)' : 'var(--text-sub)', font: (tab === i ? '600' : '500') + ' 14px/20px var(--font-sans)' }}>
            <Icon name={ic} size={17} color={tab === i ? 'var(--color-primary)' : 'var(--text-weak)'} />{l}
            {i === 0 ? <span style={{ marginLeft: 'auto', minWidth: 20, height: 20, borderRadius: 10, background: 'var(--color-danger)', color: '#fff', font: '600 11px/20px var(--font-sans)', textAlign: 'center' }}>3</span> : null}
          </div>
        ))}
        <span style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', font: 'var(--text-caption)', color: 'var(--text-weak)' }}>
          <span style={{ width: 26, height: 26, borderRadius: 13, background: 'var(--wz-gray-100)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '600 11px/1 var(--font-sans)', color: 'var(--text-sub)' }}>김</span>
          admin_kim · 연구담당자
        </div>
      </div>
      <div style={{ flex: 1, padding: '24px 28px 48px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
          <span style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)' }}>{detail !== null && tab === 0 ? '참가자 상세' : NAV[tab][1]}</span>
          <span style={{ font: 'var(--text-caption)', color: 'var(--text-weak)' }}>2026년 9월 4일 (금) 14:02 기준</span>
        </div>
        {body}
      </div>
      <ToastHost />
    </div>
  );
}
