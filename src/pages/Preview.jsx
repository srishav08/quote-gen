import React, { useState } from "react";

export default function QuoteLayoutsPreview() {
  const [which, setWhich] = useState("stacked");
  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <Header which={which} setWhich={setWhich} />
      <div className="max-w-[1200px] mx-auto p-6">
        {which === "stacked" && <Stacked />}
        {which === "accordion" && <AccordionDemo />}
        {which === "twopane" && <TwoPane />}
        {which === "minimal" && <Minimal />}        
      </div>
    </div>
  );
}

function Header({ which, setWhich }){
  const btn = (key, label) => (
    <button
      key={key}
      onClick={() => setWhich(key)}
      className={`px-3 py-1.5 rounded-full border text-sm ${
        which === key ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="font-bold text-lg">tarush</div>
          <div className="text-slate-500">Kitchen Quotation — layout previews</div>
        </div>
        <div className="ml-auto flex gap-2">
          {btn("stacked", "1 · Stacked")}
          {btn("accordion", "2 · Accordion")}
          {btn("twopane", "3 · Two‑pane")}
          {btn("minimal", "4 · Minimal")}
        </div>
      </div>
    </div>
  );
}

// Shared atoms
const Section = ({ title, children }) => (
  <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">
    <div className="p-4">
      <h3 className="m-0 text-[15px] font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  </section>
);

const Row = ({ cols = 3, children }) => (
  <div
    className="grid gap-3"
    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
  >
    {children}
  </div>
);

const Field = ({ label, placeholder = "" }) => (
  <div>
    <label className="block text-xs text-slate-500 mb-1">{label}</label>
    <input
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
      placeholder={placeholder}
      readOnly
    />
  </div>
);

const Divider = () => <div className="h-px bg-slate-200 my-2" />;

// 1) Simple stacked sections
function Stacked(){
  return (
    <div className="flex flex-col gap-4">
      <Section title="Client & Quote">
        <Row cols={2}>
          <Field label="Client Name" /><Field label="Quote No" />
          <Field label="Date" /><Field label="Client Address" />
        </Row>
      </Section>

      <Section title="Kitchen">
        <Row cols={3}>
          <Field label="Name" /><Field label="Core Material" /><Field label="Inner Liner" />
        </Row>
        <Divider />
        <Row cols={3}>
          <Field label="Face Area (sq ft)" /><Field label="Visible Area (sq ft)" /><Field label="Wall Units (sq ft)" />
        </Row>
        <Row cols={3}>
          <Field label="Base Units (sq ft)" /><Field label="Tall Units (sq ft)" /><Field label="Tandem Bottoms (sq ft)" />
        </Row>
      </Section>

      <Section title="Laminates">
        <Row cols={3}>
          <Field label="Type" /><Field label="Tier" /><Field label="(rate hidden)" />
        </Row>
      </Section>

      <Section title="Boards">
        <Row cols={3}>
          <Field label="Category" /><Field label="Type" /><Field label="Thickness" />
        </Row>
      </Section>

      <Section title="Hardware & Accessories">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">Hardware</span>
          <button className="px-3 py-1 text-sm rounded-full border border-slate-200">Add</button>
        </div>
        <Row cols={4}>
          <Field label="Brand" /><Field label="Category" /><Field label="Item" /><Field label="Qty" />
        </Row>
        <Divider />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">Accessories</span>
          <button className="px-3 py-1 text-sm rounded-full border border-slate-200">Add</button>
        </div>
        <Row cols={4}>
          <Field label="Brand" /><Field label="Category" /><Field label="Item" /><Field label="Qty" />
        </Row>
      </Section>

      <Section title="Summary">
        <div className="grid grid-cols-3 gap-3">
          <Tile label="Laminates" value="₹18,540" />
          <Tile label="Boards" value="₹22,100" />
          <Tile label="Grand Total" value="₹1,46,280" />
        </div>
      </Section>

      <div className="sticky bottom-3 flex justify-end gap-2">
        <button className="px-3 py-2 rounded-full border border-slate-200 bg-white">Quote</button>
        <button className="px-3 py-2 rounded-full border bg-slate-900 text-white">Preview / PDF</button>
      </div>
    </div>
  );
}

// 2) Accordion approach
function AccordionDemo(){
  return (
    <div className="flex flex-col gap-3">
      <Acc title="Client & Quote" open>
        <Row cols={2}>
          <Field label="Client Name" /><Field label="Quote No" />
          <Field label="Date" /><Field label="Client Address" />
        </Row>
      </Acc>
      <Acc title="Kitchen" open>
        <Row cols={3}>
          <Field label="Name" /><Field label="Core" /><Field label="Inner Liner" />
        </Row>
      </Acc>
      <Acc title="Laminates"><Row cols={3}><Field label="Type" /><Field label="Tier" /><Field label="(rate hidden)"/></Row></Acc>
      <Acc title="Boards"><Row cols={3}><Field label="Category" /><Field label="Type" /><Field label="Thickness"/></Row></Acc>
      <Acc title="Hardware & Accessories" open>
        <Row cols={4}><Field label="Brand" /><Field label="Category" /><Field label="Item" /><Field label="Qty" /></Row>
        <Divider />
        <Row cols={4}><Field label="Brand" /><Field label="Category" /><Field label="Item" /><Field label="Qty" /></Row>
      </Acc>
      <Acc title="Summary" open>
        <div className="grid grid-cols-3 gap-3">
          <Tile label="Laminates" value="₹18,540" />
          <Tile label="Boards" value="₹22,100" />
          <Tile label="Grand Total" value="₹1,46,280" />
        </div>
      </Acc>
    </div>
  );
}

function Acc({ title, children, open=false }){
  const [o, setO] = useState(open);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <button onClick={()=>setO(!o)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <span className="font-semibold text-[15px]">{title}</span>
        <span className={`text-xl transition ${o?"rotate-90":""}`}>›</span>
      </button>
      {o && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// 3) Two‑pane with sticky summary
function TwoPane(){
  return (
    <div className="grid gap-4" style={{gridTemplateColumns:"1fr 320px"}}>
      <div className="flex flex-col gap-4">
        <Section title="Client & Quote"><Row cols={2}><Field label="Client Name" /><Field label="Quote No" /><Field label="Date" /><Field label="Address" /></Row></Section>
        <Section title="Kitchen"><Row cols={3}><Field label="Name" /><Field label="Core" /><Field label="Inner Liner" /></Row></Section>
        <Section title="Materials"><Row cols={3}><Field label="Laminate Type" /><Field label="Tier" /><Field label="Boards" /></Row></Section>
        <Section title="Hardware & Accessories"><Row cols={4}><Field label="Brand" /><Field label="Category" /><Field label="Item" /><Field label="Qty" /></Row></Section>
      </div>
      <aside className="sticky top-20 h-fit">
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h4 className="font-semibold mb-3">Summary</h4>
          <div className="flex flex-col gap-2 text-sm">
            <RowLine k="Laminates" v="₹18,540" />
            <RowLine k="Boards" v="₹22,100" />
            <div className="h-px bg-slate-200 my-1" />
            <RowLine k="Grand Total" v="₹1,46,280" bold />
          </div>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1.5 rounded-full border border-slate-200">Quote</button>
            <button className="px-3 py-1.5 rounded-full bg-slate-900 text-white">Preview / PDF</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function RowLine({ k, v, bold=false }){
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{k}</span>
      <span className={bold?"font-bold":""}>{v}</span>
    </div>
  );
}

// 4) Minimal, cardless
function Minimal(){
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-[14px] font-semibold mb-2">Client & Quote</h3>
        <Row cols={2}><Field label="Client Name" /><Field label="Quote No" /><Field label="Date" /><Field label="Address" /></Row>
        <Divider />
      </div>
      <div>
        <h3 className="text-[14px] font-semibold mb-2">Kitchen</h3>
        <Row cols={3}><Field label="Name" /><Field label="Core" /><Field label="Inner Liner" /></Row>
      </div>
      <div>
        <h3 className="text-[14px] font-semibold mb-2">Materials</h3>
        <Row cols={3}><Field label="Laminate Type" /><Field label="Tier" /><Field label="Board" /></Row>
      </div>
      <div>
        <h3 className="text-[14px] font-semibold mb-2">Hardware & Accessories</h3>
        <Row cols={4}><Field label="Brand" /><Field label="Category" /><Field label="Item" /><Field label="Qty" /></Row>
      </div>
      <div>
        <h3 className="text-[14px] font-semibold mb-2">Summary</h3>
        <div className="grid grid-cols-3 gap-3">
          <Tile label="Laminates" value="₹18,540" />
          <Tile label="Boards" value="₹22,100" />
          <Tile label="Grand Total" value="₹1,46,280" />
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value }){
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-bold text-lg">{value}</div>
    </div>
  );
}