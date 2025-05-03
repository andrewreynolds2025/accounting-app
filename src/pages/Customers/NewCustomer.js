import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-multi-date-picker/styles/colors/teal.css";
import "./NewCustomer.css";
import "../../fonts/fonts.css";

const MySwal = withReactContent(Swal);

const defaultAvatar =
  "https://ui-avatars.com/api/?name=شخص+جدید&background=f7fafd&color=1976d2&size=128&rounded=true";

const initBank = { bankName: "", accountNumber: "", cardNumber: "", sheba: "" };

function NewCustomer() {
  // Stateهای اصلی
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [accountCode, setAccountCode] = useState("");
  const [accountCodeManual, setAccountCodeManual] = useState(false);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [nickname, setNickname] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [relatedPersons, setRelatedPersons] = useState("");
  const [personType, setPersonType] = useState("مشتری");
  const [tab, setTab] = useState("عمومی");

  // عمومی
  const [credit, setCredit] = useState(0);
  const [priceList, setPriceList] = useState("");
  const [taxType, setTaxType] = useState("غیر مشمول");
  const [taxRegistered, setTaxRegistered] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [economicCode, setEconomicCode] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [description, setDescription] = useState("");

  // آدرس
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("ایران");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // تماس
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [fax, setFax] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // بانک
  const [banks, setBanks] = useState([]);
  const [bankForm, setBankForm] = useState(initBank);

  // سایر
  const [birthDate, setBirthDate] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [membershipDate, setMembershipDate] = useState("");

  // دریافت دسته‌بندی‌ها و کد حسابداری
  useEffect(() => {
    fetchCategories();
    if (!accountCodeManual) fetchLastAccountCode();
    // eslint-disable-next-line
  }, [accountCodeManual]);

  // فانکشن دریافت دسته‌بندی‌ها با AJAX
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const list = await res.json();
      setCategories(list);
    } catch (e) {
      MySwal.fire({
        icon: "error",
        title: "خطا",
        text: "خطا در دریافت دسته‌بندی‌ها از سرور!"
      });
    }
  };

  // دریافت آخرین کد حسابداری از سرور
  const fetchLastAccountCode = async () => {
    try {
      const res = await fetch("/api/customers/last-account-code");
      const last = await res.json();
      let next = (parseInt(last, 10) + 1).toString().padStart(4, "0");
      setAccountCode(next);
    } catch (e) {
      setAccountCode("0001");
    }
  };

  // افزودن دسته‌بندی AJAX
  const handleAddCategory = async () => {
    if (
      newCategory.trim().length > 1 &&
      !categories.map(c => c.name).includes(newCategory.trim())
    ) {
      try {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategory.trim() })
        });
        if (res.ok) {
          setNewCategory("");
          setCategoryPopup(false);
          await fetchCategories();
          MySwal.fire({
            icon: "success",
            title: "دسته‌بندی افزوده شد"
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "خطا",
            text: "ثبت دسته‌بندی جدید با خطا مواجه شد!"
          });
        }
      } catch (e) {
        MySwal.fire({
          icon: "error",
          title: "خطا",
          text: "ارتباط با سرور برقرار نشد!"
        });
      }
    }
  };

  // تصویر پروفایل
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  // افزودن بانک
  const handleAddBank = (e) => {
    e.preventDefault();
    if (bankForm.bankName.trim() && bankForm.accountNumber.trim()) {
      setBanks([...banks, bankForm]);
      setBankForm(initBank);
    }
  };

  // حذف بانک
  const handleRemoveBank = (idx) => {
    setBanks(banks.filter((_, i) => i !== idx));
  };

  // دکمه امروز
  const setTodayMembership = () => {
    const today = new Date();
    setMembershipDate(today);
  };

  // ثبت فرم AJAX
  const handleSubmit = async (e) => {
    e.preventDefault();
    // اعتبارسنجی نمونه
    if (!name.trim() || !family.trim()) {
      MySwal.fire({
        icon: "warning",
        title: "نام و نام خانوادگی الزامی است!"
      });
      return;
    }
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar, accountCode, company, title, name, family, nickname,
          category: selectedCategory,
          relatedPersons, personType,
          credit, priceList, taxType, taxRegistered, nationalId, economicCode, registerNumber, branchCode, description,
          address, country, province, city, postalCode,
          phone, mobile, fax, phone1, phone2, phone3, email, website,
          banks, birthDate, marriageDate, membershipDate
        })
      });
      if (res.ok) {
        MySwal.fire({
          icon: "success",
          title: "اطلاعات ذخیره شد"
        });
        // بعد از ثبت، فرم خالی شود
        setAvatar(defaultAvatar);
        setAccountCode("");
        setCompany(""); setTitle(""); setName(""); setFamily(""); setNickname("");
        setSelectedCategory(""); setRelatedPersons(""); setPersonType("مشتری");
        setCredit(0); setPriceList(""); setTaxType("غیر مشمول"); setTaxRegistered(false); setNationalId(""); setEconomicCode(""); setRegisterNumber(""); setBranchCode(""); setDescription("");
        setAddress(""); setCountry("ایران"); setProvince(""); setCity(""); setPostalCode("");
        setPhone(""); setMobile(""); setFax(""); setPhone1(""); setPhone2(""); setPhone3(""); setEmail(""); setWebsite("");
        setBanks([]); setBirthDate(""); setMarriageDate(""); setMembershipDate("");
        fetchLastAccountCode();
      } else {
        MySwal.fire({
          icon: "error",
          title: "خطا",
          text: "ثبت اطلاعات با خطا مواجه شد!"
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "خطا در ارتباط با سرور"
      });
    }
  };

  return (
    <div className="new-person-container">
      <form className="new-person-form" onSubmit={handleSubmit} autoComplete="off">
        {/* هدر و تصویر */}
        <div className="np-header">
          <label htmlFor="avatar-upload" className="np-avatar-label">
            <img src={avatar} alt="تصویر پروفایل" className="np-avatar" />
            <span className="np-avatar-btn">انتخاب تصویر</span>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </label>
          <h2>ثبت شخص جدید</h2>
        </div>
        {/* اطلاعات پایه */}
        <div className="np-basic-grid">
          <div className="np-group code-group">
            <label>کد حسابداری</label>
            <div className="np-accountcode-wrap">
              <input
                value={accountCode}
                onChange={(e) => setAccountCode(e.target.value)}
                disabled={!accountCodeManual}
                maxLength={8}
                required
                placeholder="مثلاً 0008"
                style={{ textAlign: "left" }}
              />
              <label className="np-accountcode-manual">
                <input
                  type="checkbox"
                  checked={accountCodeManual}
                  onChange={() => setAccountCodeManual((s) => !s)}
                />
                ورود دستی
              </label>
            </div>
          </div>
          <div className="np-group"><label>شرکت</label>
            <input value={company} onChange={e => setCompany(e.target.value)} />
          </div>
          <div className="np-group"><label>عنوان</label>
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="np-group"><label>نام</label>
            <input value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="np-group"><label>نام خانوادگی</label>
            <input value={family} onChange={e => setFamily(e.target.value)} required />
          </div>
          <div className="np-group"><label>نام مستعار</label>
            <input value={nickname} onChange={e => setNickname(e.target.value)} />
          </div>
          <div className="np-group">
            <label>دسته‌بندی</label>
            <div className="np-category-row">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                <option value="">انتخاب...</option>
                {categories.map((c, i) =>
                  <option key={i} value={c.name}>{c.name}</option>
                )}
              </select>
              <button type="button" className="np-cat-btn" onClick={() => setCategoryPopup(true)}>
                +
              </button>
            </div>
            {/* پاپ‌آپ افزودن دسته‌بندی */}
            {categoryPopup && (
              <div className="np-popup">
                <div className="np-popup-inner">
                  <input
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    placeholder="نام دسته‌بندی جدید"
                  />
                  <div className="np-popup-actions">
                    <button type="button" onClick={handleAddCategory}>افزودن</button>
                    <button type="button" onClick={() => setCategoryPopup(false)}>انصراف</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="np-group"><label>اشخاص مرتبط</label>
            <input value={relatedPersons} onChange={e => setRelatedPersons(e.target.value)} />
          </div>
          <div className="np-group">
            <label>نوع</label>
            <select value={personType} onChange={e => setPersonType(e.target.value)}>
              <option value="مشتری">مشتری</option>
              <option value="تأمین‌کننده">تأمین‌کننده</option>
              <option value="سهامدار">سهامدار</option>
              <option value="کارمند">کارمند</option>
              <option value="سایر">سایر</option>
            </select>
          </div>
        </div>
        {/* تب‌ها */}
        <div className="np-tabs">
          {["عمومی", "آدرس", "تماس", "حساب بانکی", "سایر"].map((t) => (
            <button
              type="button"
              key={t}
              className={`np-tab${tab === t ? " np-tab-active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="np-tab-content">
          {tab === "عمومی" && (
            <div className="np-tab-panel">
              <div className="np-row">
                <div className="np-group"><label>اعتبار مالی (ریال)</label>
                  <input type="number" value={credit} onChange={e => setCredit(e.target.value)} min={0} />
                </div>
                <div className="np-group"><label>لیست قیمت</label>
                  <input value={priceList} onChange={e => setPriceList(e.target.value)} />
                </div>
                <div className="np-group"><label>نوع مالیات</label>
                  <select value={taxType} onChange={e => setTaxType(e.target.value)}>
                    <option value="غیر مشمول">غیر مشمول</option>
                    <option value="مشمول">مشمول</option>
                  </select>
                </div>
                <div className="np-group" style={{ minWidth: 150 }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={taxRegistered}
                      onChange={e => setTaxRegistered(e.target.checked)}
                      style={{ accentColor: "#1976d2", marginLeft: 5 }}
                    />
                    مودی مشمول ثبت نام در نظام مالیاتی
                  </label>
                </div>
              </div>
              <div className="np-row">
                <div className="np-group"><label>شناسه ملی</label>
                  <input value={nationalId} onChange={e => setNationalId(e.target.value)} />
                </div>
                <div className="np-group"><label>کد اقتصادی</label>
                  <input value={economicCode} onChange={e => setEconomicCode(e.target.value)} />
                </div>
                <div className="np-group"><label>شماره ثبت</label>
                  <input value={registerNumber} onChange={e => setRegisterNumber(e.target.value)} />
                </div>
                <div className="np-group"><label>کد شعبه</label>
                  <input value={branchCode} onChange={e => setBranchCode(e.target.value)} />
                </div>
              </div>
              <div className="np-group">
                <label>توضیحات</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}
          {tab === "آدرس" && (
            <div className="np-tab-panel">
              <div className="np-row">
                <div className="np-group"><label>آدرس</label>
                  <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2} />
                </div>
                <div className="np-group"><label>کشور</label>
                  <input value={country} onChange={e => setCountry(e.target.value)} />
                </div>
                <div className="np-group"><label>استان</label>
                  <input value={province} onChange={e => setProvince(e.target.value)} />
                </div>
                <div className="np-group"><label>شهر</label>
                  <input value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div className="np-group"><label>کدپستی</label>
                  <input value={postalCode} onChange={e => setPostalCode(e.target.value)} maxLength={10} />
                </div>
              </div>
            </div>
          )}
          {tab === "تماس" && (
            <div className="np-tab-panel">
              <div className="np-row">
                <div className="np-group"><label>تلفن</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="np-group"><label>موبایل</label>
                  <input value={mobile} onChange={e => setMobile(e.target.value)} />
                </div>
                <div className="np-group"><label>فکس</label>
                  <input value={fax} onChange={e => setFax(e.target.value)} />
                </div>
                <div className="np-group"><label>تلفن ۱</label>
                  <input value={phone1} onChange={e => setPhone1(e.target.value)} />
                </div>
                <div className="np-group"><label>تلفن ۲</label>
                  <input value={phone2} onChange={e => setPhone2(e.target.value)} />
                </div>
                <div className="np-group"><label>تلفن ۳</label>
                  <input value={phone3} onChange={e => setPhone3(e.target.value)} />
                </div>
                <div className="np-group"><label>ایمیل</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="np-group"><label>وب سایت</label>
                  <input value={website} onChange={e => setWebsite(e.target.value)} />
                </div>
              </div>
            </div>
          )}
          {tab === "حساب بانکی" && (
            <div className="np-tab-panel">
              <div className="np-bank-list">
                {banks.length > 0 &&
                  banks.map((b, i) => (
                    <div className="np-bank-item" key={i}>
                      <span>
                        <b>{b.bankName}</b> | حساب: {b.accountNumber} | کارت: {b.cardNumber} | شبا: {b.sheba}
                      </span>
                      <button type="button" className="np-bank-remove" onClick={() => handleRemoveBank(i)}>
                        حذف
                      </button>
                    </div>
                  ))}
              </div>
              <form className="np-bank-form" onSubmit={handleAddBank}>
                <input
                  placeholder="نام بانک"
                  value={bankForm.bankName}
                  onChange={e => setBankForm({ ...bankForm, bankName: e.target.value })}
                  required
                />
                <input
                  placeholder="شماره حساب"
                  value={bankForm.accountNumber}
                  onChange={e => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                  required
                />
                <input
                  placeholder="شماره کارت"
                  value={bankForm.cardNumber}
                  onChange={e => setBankForm({ ...bankForm, cardNumber: e.target.value })}
                />
                <input
                  placeholder="شبا"
                  value={bankForm.sheba}
                  onChange={e => setBankForm({ ...bankForm, sheba: e.target.value })}
                />
                <button type="submit" className="np-bank-add">افزودن</button>
              </form>
            </div>
          )}
          {tab === "سایر" && (
            <div className="np-tab-panel">
              <div className="np-row">
                <div className="np-group"><label>تاریخ تولد</label>
                  <DatePicker
                    value={birthDate}
                    onChange={setBirthDate}
                    calendarPosition="bottom-right"
                    inputClass="np-datepicker"
                    format="YYYY/MM/DD"
                    calendar="persian"
                    locale="fa"
                    placeholder="انتخاب تاریخ"
                  />
                </div>
                <div className="np-group"><label>تاریخ ازدواج</label>
                  <DatePicker
                    value={marriageDate}
                    onChange={setMarriageDate}
                    calendarPosition="bottom-right"
                    inputClass="np-datepicker"
                    format="YYYY/MM/DD"
                    calendar="persian"
                    locale="fa"
                    placeholder="انتخاب تاریخ"
                  />
                </div>
                <div className="np-group"><label>تاریخ عضویت</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <DatePicker
                      value={membershipDate}
                      onChange={setMembershipDate}
                      calendarPosition="bottom-right"
                      inputClass="np-datepicker"
                      format="YYYY/MM/DD"
                      calendar="persian"
                      locale="fa"
                      placeholder="انتخاب تاریخ"
                    />
                    <button type="button" className="np-today-btn" onClick={setTodayMembership}>
                      امروز
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="np-actions">
          <button type="submit" className="np-submit-btn">
            ذخیره شخص جدید
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCustomer;