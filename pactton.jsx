import { useState } from "react";

// ─── 울산 기반 배송비 ───
const PRICING_DATA = [
  { price: "10,000원", areas: "남구, 중구" },
  { price: "9,000원", areas: "동구, 북구" },
  { price: "10,000원", areas: "울주군 (범서, 언양, 삼남)" },
  { price: "12,000원", areas: "울주군 (온양, 웅촌, 청량)" },
  { price: "15,000원", areas: "울주군 외곽 (서생, 온산, 두동, 두서, 상북)" },
];

const EXTRA_VENUE = [
  { price: "3,000원", desc: "울산 롯데호텔, 현대호텔" },
  { price: "5,000원", desc: "울산컨벤션센터, 울산대공원 내 행사장" },
];

const EXTRA_ITEMS = [
  { item: "축하/근조/행사", desc: "평일: 추가 시 개당 5,000원 (7개부터 10,000원) | 주말: 지역별 상이" },
  { item: "축하/근조/행사 4단", desc: "개당 +3,000원" },
  { item: "영정 바구니", desc: "2개부터 5,000원" },
  { item: "축하/근조/행사 5단", desc: "개당 지역 배송비 2배" },
  { item: "급살", desc: "해당 지역 배송비 2배" },
  { item: "관엽식물", desc: "평일/주말: 추가 시 개당 5,000원 (7개부터 10,000원)" },
  { item: "장례용품", desc: "추가 시 개당 5,000원 (7개부터 10,000원)" },
  { item: "동·서양란", desc: "동양란: 2개부터 개당 3,000원 | 서양란: 2개부터 개당 5,000원" },
];

const NOTICES = [
  { title: "📢 팍특송 주말 마감시간 변경 공지합니다.", date: "26.03.07" },
  { title: "금일 배송안내", date: "26.02.23" },
  { title: "팍특송 설날연휴 운영시간 참고바랍니다!", date: "26.02.12" },
];

// ─── 로그인 페이지 ───
function LoginPage({ onBack, onHome, onGoRegister }) {
  const [tab, setTab] = useState("driver");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [autoLogin, setAutoLogin] = useState(true);
  const [showPw, setShowPw] = useState(false);

  const tabLabel = tab === "driver" ? "배송기사" : "화원사장님";

  return (
    <div style={loginStyles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { outline: none; border-color: rgba(74,144,217,0.5) !important; }
        input::placeholder { color: rgba(255,255,255,0.25); }
        button:active { opacity: 0.85; }
      `}</style>

      <div style={loginStyles.header}>
        <button style={loginStyles.headerBtn} onClick={onBack}>‹</button>
        <span style={loginStyles.headerTitle}>로그인</span>
        <button style={loginStyles.headerBtn} onClick={onHome}>⌂</button>
      </div>

      <div style={loginStyles.tabs}>
        <button
          style={{ ...loginStyles.tab, ...(tab === "driver" ? loginStyles.tabActive : {}) }}
          onClick={() => setTab("driver")}
        >배송기사</button>
        <button
          style={{ ...loginStyles.tab, ...(tab === "owner" ? loginStyles.tabActive : {}) }}
          onClick={() => setTab("owner")}
        >화원사장님</button>
      </div>

      <div style={loginStyles.logoArea}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path d="M16 18L36 36L16 54" stroke="#4A90D9" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 18L52 36L32 54" stroke="#7BC67E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div style={loginStyles.form}>
        <div style={loginStyles.inputGroup}>
          <input
            style={loginStyles.input}
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div style={loginStyles.inputGroup}>
          <div style={{ position: "relative" }}>
            <input
              style={{ ...loginStyles.input, paddingRight: 48 }}
              type={showPw ? "text" : "password"}
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <button style={loginStyles.eyeBtn} onClick={() => setShowPw(!showPw)}>
              {showPw ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <button style={loginStyles.submitBtn}>{tabLabel}로그인</button>

        <label style={loginStyles.autoLogin} onClick={() => setAutoLogin(!autoLogin)}>
          <div style={{ ...loginStyles.checkbox, ...(autoLogin ? loginStyles.checkboxChecked : {}) }}>
            {autoLogin && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>자동 로그인</span>
        </label>

        <div style={loginStyles.links}>
          <button style={loginStyles.linkBtn}>아이디 찾기</button>
          <span style={loginStyles.linkDivider}>|</span>
          <button style={loginStyles.linkBtn}>비밀번호 찾기</button>
          <span style={loginStyles.linkDivider}>|</span>
          <button style={loginStyles.linkBtn} onClick={() => onGoRegister(tab)}>
            {tabLabel} 회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 회원가입 페이지 ───
function RegisterPage({ onBack, onHome, userType }) {
  const label = userType === "driver" ? "배송기사" : "화원사장님";
  const [form, setForm] = useState({
    name: "", id: "", pw: "", pwConfirm: "", phone: "", address: "",
    ...(userType === "owner" ? { shopName: "", bizNumber: "" } : { vehicleType: "" }),
  });
  const [agreed, setAgreed] = useState(false);

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const fields = [
    { key: "name", label: "이름", type: "text", ph: "실명을 입력하세요" },
    { key: "id", label: "아이디", type: "text", ph: "영문/숫자 조합 4~20자" },
    { key: "pw", label: "비밀번호", type: "password", ph: "영문/숫자/특수문자 8자 이상" },
    { key: "pwConfirm", label: "비밀번호 확인", type: "password", ph: "비밀번호를 다시 입력하세요" },
    { key: "phone", label: "휴대폰번호", type: "tel", ph: "'-' 없이 입력 (01012345678)" },
    ...(userType === "owner"
      ? [
          { key: "shopName", label: "화원명", type: "text", ph: "화원 이름을 입력하세요" },
          { key: "bizNumber", label: "사업자등록번호", type: "text", ph: "'-' 없이 입력" },
        ]
      : [
          { key: "vehicleType", label: "차량 종류", type: "text", ph: "예: 오토바이, 다마스, 1톤" },
        ]),
    { key: "address", label: "주소", type: "text", ph: "기본 주소를 입력하세요" },
  ];

  return (
    <div style={loginStyles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { outline: none; border-color: rgba(74,144,217,0.5) !important; }
        input::placeholder { color: rgba(255,255,255,0.25); }
        button:active { opacity: 0.85; }
      `}</style>

      <div style={loginStyles.header}>
        <button style={loginStyles.headerBtn} onClick={onBack}>‹</button>
        <span style={loginStyles.headerTitle}>{label} 회원가입</span>
        <button style={loginStyles.headerBtn} onClick={onHome}>⌂</button>
      </div>

      <div style={regStyles.formArea}>
        {fields.map((f) => (
          <div key={f.key} style={regStyles.fieldGroup}>
            <label style={regStyles.label}>{f.label} <span style={{ color: "#E74C3C" }}>*</span></label>
            <input
              style={loginStyles.input}
              type={f.type}
              placeholder={f.ph}
              value={form[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
            />
          </div>
        ))}

        <div style={{ marginTop: 8, marginBottom: 20 }}>
          <label style={loginStyles.autoLogin} onClick={() => setAgreed(!agreed)}>
            <div style={{ ...loginStyles.checkbox, ...(agreed ? loginStyles.checkboxChecked : {}) }}>
              {agreed && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>이용약관 및 개인정보처리방침에 동의합니다.</span>
          </label>
        </div>

        <button style={loginStyles.submitBtn}>{label} 가입하기</button>

        <p style={regStyles.footerNote}>
          이미 계정이 있으신가요?{" "}
          <button style={regStyles.backLink} onClick={onBack}>로그인</button>
        </p>
      </div>
    </div>
  );
}

// ─── 메인 앱 ───
export default function PacTtonApp() {
  const [page, setPage] = useState("main");
  const [showPricing, setShowPricing] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [registerType, setRegisterType] = useState("driver");

  const handleProtected = (e) => { e.preventDefault(); setShowLoginModal(true); };

  if (page === "login") {
    return (
      <LoginPage
        onBack={() => setPage("main")}
        onHome={() => setPage("main")}
        onGoRegister={(t) => { setRegisterType(t); setPage("register"); }}
      />
    );
  }
  if (page === "register") {
    return (
      <RegisterPage
        onBack={() => setPage("login")}
        onHome={() => setPage("main")}
        userType={registerType}
      />
    );
  }

  return (
    <div style={s.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        button:active { opacity: 0.85; }
      `}</style>

      {/* Header */}
      <header style={s.header}>
        <div style={s.headerInner}>
          <div style={s.logoArea}>
            <span style={{ fontSize: 24 }}>🚚</span>
            <div>
              <h1 style={s.logoText}>팍특송</h1>
              <p style={s.logoSub}>PAC1TON</p>
            </div>
          </div>
          <button style={s.loginBtn} onClick={() => setPage("login")}>로그인</button>
        </div>
      </header>

      {/* Balance */}
      <section style={s.sec}>
        <div style={s.balanceCard} onClick={() => setShowLoginModal(true)}>
          <div>
            <p style={s.balanceLabel}>나의 보유 배송비</p>
            <p style={s.balanceAmount}>0 <span style={s.balanceWon}>원</span></p>
          </div>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }}>→</span>
        </div>
      </section>

      {/* Dashboard */}
      <section style={s.sec}>
        <div style={s.grid}>
          {[
            { icon: "📋", bg: "#EEF2FF", t: "배송등록", sub: "오늘 0건 · 전체 0건" },
            { icon: "🚛", bg: "#FFF7ED", t: "배송현황", sub: "배송중 0건" },
            { icon: "✅", bg: "#F0FDF4", t: "배송완료", sub: "오늘 0건 · 전체 0건" },
            { icon: "💰", bg: "#FDF2F8", t: "배송비 충전", sub: "현재 0원" },
          ].map((c, i) => (
            <div key={i} style={s.card} onClick={handleProtected}>
              <div style={{ ...s.cardIcon, backgroundColor: c.bg }}>{c.icon}</div>
              <div>
                <p style={s.cardT}>{c.t}</p>
                <p style={s.cardS}>{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notices */}
      <section style={s.sec}>
        <h3 style={s.secTitle}>📢 공지사항</h3>
        <div style={s.nList}>
          {NOTICES.map((n, i) => (
            <div key={i} style={s.nItem}>
              <p style={s.nText}>{n.title}</p>
              <span style={s.nDate}>{n.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={s.sec}>
        <button style={s.priceToggle} onClick={() => setShowPricing(!showPricing)}>
          <span>💰 울산 지역 배송비</span>
          <span style={{ transform: showPricing ? "rotate(180deg)" : "none", transition: "0.3s" }}>▼</span>
        </button>
        {showPricing && (
          <div style={{ marginTop: 12, animation: "fadeInUp 0.3s ease-out" }}>
            <PriceTable title="지역별 배송비" h={["배송비","배송지역"]} rows={PRICING_DATA.map(r=>[r.price,r.areas])} />
            <PriceTable title="장소별 추가 요금" h={["추가요금","해당 장소"]} rows={EXTRA_VENUE.map(r=>[r.price,r.desc])} mt={18} />
            <PriceTable title="기타 추가 요금" h={["항목","요금"]} rows={EXTRA_ITEMS.map(r=>[r.item,r.desc])} mt={18} />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.fTop}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>팍특송</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button style={s.fLink} onClick={() => setShowTerms(true)}>이용약관</button>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>|</span>
            <button style={s.fLink} onClick={() => setShowPrivacy(true)}>개인정보처리방침</button>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          {[
            ["대표자명","홍길동"],["주소","울산광역시 남구 (상세주소 미정)"],
            ["사업자등록번호","000-00-00000"],["고객센터","010-0000-0000 / 24시간"],
            ["Email","pac1ton@naver.com"],
          ].map(([l,v],i)=>(
            <div key={i} style={s.fRow}><span style={s.fLabel}>{l}</span><span>{v}</span></div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: 14 }}>
          Copyright ⓒ 팍특송, All rights reserved.
        </p>
      </footer>

      {/* Modals */}
      {showTerms && <ModalBox title="서비스 이용약관" onClose={() => setShowTerms(false)}>
        <p>제 1 조 (목적) 이 이용약관은 "팍특송"에서 제공하는 인터넷 서비스의 가입조건, 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정합니다.</p>
        <br/><p>※ 전체 이용약관은 추후 업데이트 예정입니다.</p>
      </ModalBox>}
      {showPrivacy && <ModalBox title="개인정보처리방침" onClose={() => setShowPrivacy(false)}>
        <p>팍특송(이하 "회사")는 개인정보보호법 등 관련 법령을 준수하며, 이용자의 권익보호에 최선을 다합니다.</p>
        <br/><p>수집항목: 이름, 아이디, 비밀번호, 휴대폰번호, 주소</p>
        <br/><p>※ 전체 개인정보처리방침은 추후 업데이트 예정입니다.</p>
      </ModalBox>}
      {showLoginModal && (
        <div style={m.overlay} onClick={() => setShowLoginModal(false)}>
          <div style={m.loginBox} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🔒</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1B2A4A", marginBottom: 6 }}>로그인 안내</h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 22 }}>로그인 후 이용 가능합니다.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={m.cancel} onClick={() => setShowLoginModal(false)}>취소</button>
              <button style={m.confirm} onClick={() => { setShowLoginModal(false); setPage("login"); }}>로그인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 공용 ───
function PriceTable({ title, h, rows, mt = 0 }) {
  return (
    <div style={{ marginTop: mt }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 6, paddingLeft: 2 }}>{title}</h4>
      <div style={s.table}>
        <div style={s.tHead}><div style={s.thL}>{h[0]}</div><div style={s.thR}>{h[1]}</div></div>
        {rows.map((r,i)=>(
          <div key={i} style={{ ...s.tRow, backgroundColor: i%2===0?"#FAFBFF":"#fff" }}>
            <div style={s.tdL}>{r[0]}</div><div style={s.tdR}>{r[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalBox({ title, onClose, children }) {
  return (
    <div style={m.overlay} onClick={onClose}>
      <div style={m.box} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1B2A4A", marginBottom: 14 }}>{title}</h3>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 18 }}>{children}</div>
        <button style={m.closeBtn} onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

// ═══ STYLES ═══
const N = "#1B2A4A";
const NL = "#2C4170";

const s = {
  wrapper: { fontFamily: "'Noto Sans KR',sans-serif", maxWidth: 480, margin: "0 auto", backgroundColor: "#F5F6FA", minHeight: "100vh" },
  header: { background: `linear-gradient(135deg,${N},${NL})`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 },
  headerInner: { display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 },
  logoArea: { display: "flex", alignItems: "center", gap: 10 },
  logoText: { fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: -0.5, lineHeight: 1.2 },
  logoSub: { fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 1.5 },
  loginBtn: { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Noto Sans KR',sans-serif" },
  sec: { padding: 16 },
  secTitle: { fontSize: 15, fontWeight: 700, color: N, marginBottom: 10 },
  balanceCard: { background: `linear-gradient(135deg,${N},${NL})`, borderRadius: 16, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", boxShadow: "0 4px 18px rgba(27,42,74,0.22)" },
  balanceLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 3 },
  balanceAmount: { color: "#fff", fontSize: 26, fontWeight: 800 },
  balanceWon: { fontSize: 14, fontWeight: 400, opacity: 0.7 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: "15px 13px", display: "flex", alignItems: "center", gap: 11, cursor: "pointer", boxShadow: "0 1px 5px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" },
  cardIcon: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 },
  cardT: { fontSize: 13, fontWeight: 700, color: N, marginBottom: 2 },
  cardS: { fontSize: 11, color: "#8892A6" },
  nList: { backgroundColor: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 5px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" },
  nItem: { padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F0F1F5", gap: 12 },
  nText: { fontSize: 13, color: "#333", fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  nDate: { fontSize: 11, color: "#AAB0BD", flexShrink: 0 },
  priceToggle: { width: "100%", padding: "14px 18px", backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.04)", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 15, fontWeight: 600, color: N, cursor: "pointer", boxShadow: "0 1px 5px rgba(0,0,0,0.04)", fontFamily: "'Noto Sans KR',sans-serif" },
  table: { backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 5px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" },
  tHead: { display: "flex", backgroundColor: N, padding: "9px 14px" },
  thL: { width: 90, flexShrink: 0, fontSize: 12, fontWeight: 600, color: "#fff" },
  thR: { flex: 1, fontSize: 12, fontWeight: 600, color: "#fff" },
  tRow: { display: "flex", padding: "9px 14px", borderBottom: "1px solid #F0F1F5", alignItems: "flex-start" },
  tdL: { width: 90, flexShrink: 0, fontSize: 13, fontWeight: 700, color: NL },
  tdR: { flex: 1, fontSize: 12, color: "#555", lineHeight: 1.5 },
  footer: { backgroundColor: N, padding: "22px 20px 18px", marginTop: 8 },
  fTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" },
  fLink: { background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer", fontFamily: "'Noto Sans KR',sans-serif", padding: 0 },
  fRow: { display: "flex", gap: 10, marginBottom: 5, fontSize: 11, color: "rgba(255,255,255,0.5)" },
  fLabel: { fontWeight: 600, color: "rgba(255,255,255,0.35)", width: 100, flexShrink: 0 },
};

const m = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 },
  box: { backgroundColor: "#fff", borderRadius: 16, padding: 24, maxWidth: 420, width: "100%", maxHeight: "70vh", overflow: "auto" },
  closeBtn: { width: "100%", padding: 12, backgroundColor: N, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Noto Sans KR',sans-serif" },
  loginBox: { backgroundColor: "#fff", borderRadius: 20, padding: "28px 22px", maxWidth: 310, width: "100%", textAlign: "center" },
  cancel: { flex: 1, padding: 12, backgroundColor: "#F0F1F5", color: "#666", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Noto Sans KR',sans-serif" },
  confirm: { flex: 1, padding: 12, backgroundColor: N, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Noto Sans KR',sans-serif" },
};

const loginStyles = {
  wrapper: { fontFamily: "'Noto Sans KR',sans-serif", maxWidth: 480, margin: "0 auto", backgroundColor: "#111820", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px", height: 52, borderBottom: "1px solid rgba(255,255,255,0.08)" },
  headerBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: 22, cursor: "pointer", padding: "8px 12px", fontFamily: "'Noto Sans KR',sans-serif" },
  headerTitle: { fontSize: 16, fontWeight: 600, color: "#fff" },
  tabs: { display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)" },
  tab: { flex: 1, padding: "13px 0", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.35)", background: "none", border: "none", borderBottom: "2px solid transparent", cursor: "pointer", fontFamily: "'Noto Sans KR',sans-serif", transition: "all 0.2s" },
  tabActive: { color: "#fff", borderBottomColor: "#4A90D9" },
  logoArea: { display: "flex", justifyContent: "center", padding: "32px 0 22px" },
  form: { padding: "0 24px", flex: 1 },
  inputGroup: { marginBottom: 12 },
  input: { width: "100%", padding: "14px 16px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 14, color: "#fff", fontFamily: "'Noto Sans KR',sans-serif" },
  eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 18, cursor: "pointer", padding: 4 },
  submitBtn: { width: "100%", padding: "15px", background: `linear-gradient(135deg,${NL},#4A6DB5)`, border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, color: "#fff", cursor: "pointer", marginTop: 6, marginBottom: 16, fontFamily: "'Noto Sans KR',sans-serif", boxShadow: "0 4px 16px rgba(44,65,112,0.4)" },
  autoLogin: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 22 },
  checkbox: { width: 22, height: 22, borderRadius: 6, border: "1.5px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 },
  checkboxChecked: { backgroundColor: "#4A90D9", borderColor: "#4A90D9" },
  links: { display: "flex", justifyContent: "center", alignItems: "center", gap: 6, paddingBottom: 28 },
  linkBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer", fontFamily: "'Noto Sans KR',sans-serif", padding: "4px 2px" },
  linkDivider: { color: "rgba(255,255,255,0.12)", fontSize: 12 },
};

const regStyles = {
  formArea: { padding: "18px 24px", flex: 1, overflowY: "auto" },
  fieldGroup: { marginBottom: 14 },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 6 },
  footerNote: { textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.4)", paddingBottom: 28 },
  backLink: { background: "none", border: "none", color: "#4A90D9", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Noto Sans KR',sans-serif", textDecoration: "underline" },
};
