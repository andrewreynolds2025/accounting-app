import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tab,
  Tabs,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  CircularProgress,
  IconButton,
  Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DatePicker from "react-multi-date-picker";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-multi-date-picker/styles/colors/teal.css";
import "../../fonts/fonts.css";

const MySwal = withReactContent(Swal);

const defaultAvatar =
  "https://ui-avatars.com/api/?name=شخص+جدید&background=f7fafd&color=1976d2&size=128&rounded=true";

const bankInit = { bankName: "", accountNumber: "", cardNumber: "", sheba: "" };

export default function NewCustomer() {
  // States
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
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [relatedPersons, setRelatedPersons] = useState("");
  const [personType, setPersonType] = useState("مشتری");
  const [tab, setTab] = useState(0);

  // عمومی
  const [credit, setCredit] = useState("");
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
  const [bankForm, setBankForm] = useState(bankInit);

  // سایر
  const [birthDate, setBirthDate] = useState(null);
  const [marriageDate, setMarriageDate] = useState(null);
  const [membershipDate, setMembershipDate] = useState(null);

  // لودینگ کلی
  const [loading, setLoading] = useState(false);

  // دسته‌بندی‌ها از سرور
  useEffect(() => {
    loadCategories();
    if (!accountCodeManual) loadLastAccountCode();
    // eslint-disable-next-line
  }, [accountCodeManual]);

  const loadCategories = async () => {
    setCategoryLoading(true);
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCategories(data);
    } catch {
      MySwal.fire({ icon: "error", title: "خطا", text: "دریافت دسته‌بندی‌ها از سرور ممکن نشد!" });
      setCategories([]);
    }
    setCategoryLoading(false);
  };

  const loadLastAccountCode = async () => {
    try {
      const res = await fetch("/api/customers/last-account-code");
      if (!res.ok) throw new Error();
      const last = await res.json();
      let next = (parseInt(last, 10) + 1).toString().padStart(4, "0");
      setAccountCode(next);
    } catch {
      setAccountCode("0001");
    }
  };

  // افزودن دسته‌بندی جدید
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
          await loadCategories();
          MySwal.fire({ icon: "success", title: "دسته‌بندی افزوده شد" });
        } else {
          MySwal.fire({ icon: "error", title: "خطا", text: "ثبت دسته‌بندی جدید با خطا مواجه شد!" });
        }
      } catch {
        MySwal.fire({ icon: "error", title: "خطا", text: "ارتباط با سرور برقرار نشد!" });
      }
    }
  };

  // عکس پروفایل
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  // بانک
  const handleAddBank = (e) => {
    e.preventDefault();
    if (bankForm.bankName.trim() && bankForm.accountNumber.trim()) {
      setBanks([...banks, bankForm]);
      setBankForm(bankInit);
    }
  };
  const handleRemoveBank = (i) => setBanks(banks.filter((_, idx) => idx !== i));

  // ثبت فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !family.trim()) {
      MySwal.fire({ icon: "warning", title: "نام و نام خانوادگی الزامی است!" });
      return;
    }
    setLoading(true);
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
        MySwal.fire({ icon: "success", title: "اطلاعات ذخیره شد" });
        // ریست فرم
        setAvatar(defaultAvatar);
        setAccountCode("");
        setCompany(""); setTitle(""); setName(""); setFamily(""); setNickname("");
        setSelectedCategory(""); setRelatedPersons(""); setPersonType("مشتری");
        setCredit(""); setPriceList(""); setTaxType("غیر مشمول"); setTaxRegistered(false); setNationalId(""); setEconomicCode(""); setRegisterNumber(""); setBranchCode(""); setDescription("");
        setAddress(""); setCountry("ایران"); setProvince(""); setCity(""); setPostalCode("");
        setPhone(""); setMobile(""); setFax(""); setPhone1(""); setPhone2(""); setPhone3(""); setEmail(""); setWebsite("");
        setBanks([]); setBirthDate(null); setMarriageDate(null); setMembershipDate(null);
        loadLastAccountCode();
      } else {
        MySwal.fire({ icon: "error", title: "خطا", text: "ثبت اطلاعات با خطا مواجه شد!" });
      }
    } catch {
      MySwal.fire({ icon: "error", title: "خطا در ارتباط با سرور" });
    }
    setLoading(false);
  };

  // تب‌ها
  const tabLabels = ["عمومی", "آدرس", "تماس", "حساب بانکی", "سایر"];

  // --- Render ---
  return (
    <Box sx={{
      maxWidth: 1100,
      margin: "40px auto 0",
      fontFamily: "'AnjomanMax'",
      direction: "rtl"
    }}>
      <Card sx={{ p: 2, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="primary" mb={3}>ثبت شخص جدید</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <Avatar
                src={avatar}
                sx={{
                  width: 92, height: 92, border: "3px solid #e6f0fd",
                  boxShadow: 3, bgcolor: "#f7fafd", cursor: "pointer"
                }}
              />
              <Typography sx={{ mt: 1, fontSize: "0.97rem", color: "primary.main", textAlign: "center" }}>
                تغییر تصویر
              </Typography>
            </label>
          </Box>

          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid container spacing={2} mb={2}>
              {/* اطلاعات پایه */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="کد حسابداری"
                  value={accountCode}
                  onChange={e => setAccountCode(e.target.value)}
                  disabled={!accountCodeManual}
                  fullWidth
                  inputProps={{ style: { textAlign: "left" } }}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <input
                    type="checkbox"
                    checked={accountCodeManual}
                    onChange={() => setAccountCodeManual(s => !s)}
                    id="manual-code"
                  />
                  <label htmlFor="manual-code" style={{ fontSize: "0.97rem", color: "#1976d2", marginRight: 5 }}>ورود دستی</label>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="شرکت" value={company} onChange={e => setCompany(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="عنوان" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="نام" value={name} onChange={e => setName(e.target.value)} required fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="نام خانوادگی" value={family} onChange={e => setFamily(e.target.value)} required fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="نام مستعار" value={nickname} onChange={e => setNickname(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>دسته‌بندی</InputLabel>
                  <Select
                    label="دسته‌بندی"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    endAdornment={
                      <IconButton onClick={() => setCategoryPopup(true)} size="small">
                        <AddIcon />
                      </IconButton>
                    }
                  >
                    <MenuItem value="">انتخاب...</MenuItem>
                    {categoryLoading ? <MenuItem disabled>در حال بارگذاری...</MenuItem> :
                      categories.map((c, i) => (
                        <MenuItem key={i} value={c.name}>{c.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                {/* پاپ‌آپ افزودن دسته‌بندی */}
                {categoryPopup && (
                  <Box sx={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    bgcolor: "#000a", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Box sx={{
                      bgcolor: "#fff", borderRadius: 3, boxShadow: 5, p: 4, minWidth: 270,
                      display: "flex", flexDirection: "column", gap: 2
                    }}>
                      <TextField
                        label="نام دسته‌بندی جدید"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        autoFocus
                        fullWidth
                      />
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={handleAddCategory}>افزودن</Button>
                        <Button variant="outlined" color="secondary" onClick={() => setCategoryPopup(false)}>انصراف</Button>
                      </Stack>
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="اشخاص مرتبط" value={relatedPersons} onChange={e => setRelatedPersons(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>نوع</InputLabel>
                  <Select
                    label="نوع"
                    value={personType}
                    onChange={e => setPersonType(e.target.value)}
                  >
                    <MenuItem value="مشتری">مشتری</MenuItem>
                    <MenuItem value="تأمین‌کننده">تأمین‌کننده</MenuItem>
                    <MenuItem value="سهامدار">سهامدار</MenuItem>
                    <MenuItem value="کارمند">کارمند</MenuItem>
                    <MenuItem value="سایر">سایر</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* تب‌ها */}
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 1 }}>
              {tabLabels.map((t, i) => <Tab key={i} label={t} sx={{ fontFamily: "'AnjomanMax'" }} />)}
            </Tabs>
            <Box sx={{ bgcolor: "#f7fafd", borderRadius: 2, p: 3, mb: 2, minHeight: 140 }}>
              {tab === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="اعتبار مالی (ریال)"
                      type="number"
                      value={credit}
                      onChange={e => setCredit(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="لیست قیمت"
                      value={priceList}
                      onChange={e => setPriceList(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>نوع مالیات</InputLabel>
                      <Select value={taxType} label="نوع مالیات" onChange={e => setTaxType(e.target.value)}>
                        <MenuItem value="غیر مشمول">غیر مشمول</MenuItem>
                        <MenuItem value="مشمول">مشمول</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} alignItems="center" display="flex">
                    <input
                      type="checkbox"
                      checked={taxRegistered}
                      onChange={e => setTaxRegistered(e.target.checked)}
                      id="tax-reg"
                    />
                    <label htmlFor="tax-reg" style={{ marginRight: 7, fontSize: "0.97rem", color: "#1976d2" }}>
                      مودی مشمول ثبت نام در نظام مالیاتی
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField label="شناسه ملی" value={nationalId} onChange={e => setNationalId(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField label="کد اقتصادی" value={economicCode} onChange={e => setEconomicCode(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField label="شماره ثبت" value={registerNumber} onChange={e => setRegisterNumber(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField label="کد شعبه" value={branchCode} onChange={e => setBranchCode(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="توضیحات"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows={2}
                      multiline
                      fullWidth
                    />
                  </Grid>
                </Grid>
              )}
              {tab === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="آدرس"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      rows={2}
                      multiline
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="کشور" value={country} onChange={e => setCountry(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="استان" value={province} onChange={e => setProvince(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="شهر" value={city} onChange={e => setCity(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="کدپستی" value={postalCode} onChange={e => setPostalCode(e.target.value)} fullWidth />
                  </Grid>
                </Grid>
              )}
              {tab === 2 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <TextField label="تلفن" value={phone} onChange={e => setPhone(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="موبایل" value={mobile} onChange={e => setMobile(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="فکس" value={fax} onChange={e => setFax(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="تلفن ۱" value={phone1} onChange={e => setPhone1(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="تلفن ۲" value={phone2} onChange={e => setPhone2(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="تلفن ۳" value={phone3} onChange={e => setPhone3(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="ایمیل" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="وب سایت" value={website} onChange={e => setWebsite(e.target.value)} fullWidth />
                  </Grid>
                </Grid>
              )}
              {tab === 3 && (
                <Box>
                  {banks.length > 0 && (
                    <Box mb={2}>
                      {banks.map((b, i) => (
                        <Box key={i} sx={{
                          bgcolor: "#e6f0fd", color: "#1976d2", borderRadius: 2,
                          p: 1.5, mb: 1, display: "flex", alignItems: "center", justifyContent: "space-between"
                        }}>
                          <span>
                            <b>{b.bankName}</b> | حساب: {b.accountNumber} | کارت: {b.cardNumber} | شبا: {b.sheba}
                          </span>
                          <Button size="small" color="error" onClick={() => handleRemoveBank(i)}>حذف</Button>
                        </Box>
                      ))}
                    </Box>
                  )}
                  <Grid container spacing={1} component="form" onSubmit={handleAddBank}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="نام بانک"
                        value={bankForm.bankName}
                        onChange={e => setBankForm({ ...bankForm, bankName: e.target.value })}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="شماره حساب"
                        value={bankForm.accountNumber}
                        onChange={e => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="شماره کارت"
                        value={bankForm.cardNumber}
                        onChange={e => setBankForm({ ...bankForm, cardNumber: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        label="شبا"
                        value={bankForm.sheba}
                        onChange={e => setBankForm({ ...bankForm, sheba: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={1} display="flex" alignItems="center">
                      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, width: "100%" }}>افزودن</Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {tab === 4 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography sx={{ mb: 1 }}>تاریخ تولد</Typography>
                    <DatePicker
                      value={birthDate}
                      onChange={setBirthDate}
                      calendarPosition="bottom-right"
                      inputClass="np-datepicker"
                      format="YYYY/MM/DD"
                      calendar="persian"
                      locale="fa"
                      placeholder="انتخاب تاریخ"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography sx={{ mb: 1 }}>تاریخ ازدواج</Typography>
                    <DatePicker
                      value={marriageDate}
                      onChange={setMarriageDate}
                      calendarPosition="bottom-right"
                      inputClass="np-datepicker"
                      format="YYYY/MM/DD"
                      calendar="persian"
                      locale="fa"
                      placeholder="انتخاب تاریخ"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography sx={{ mb: 1 }}>تاریخ عضویت</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DatePicker
                        value={membershipDate}
                        onChange={setMembershipDate}
                        calendarPosition="bottom-right"
                        inputClass="np-datepicker"
                        format="YYYY/MM/DD"
                        calendar="persian"
                        locale="fa"
                        placeholder="انتخاب تاریخ"
                        style={{ width: "100%" }}
                      />
                      <Button variant="outlined" onClick={() => setMembershipDate(new Date())}>امروز</Button>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Box>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 8, px: 7, fontWeight: "bold", fontFamily: "'AnjomanMax'" }}
                disabled={loading}
                startIcon={loading && <CircularProgress size={18} />}
              >
                ذخیره شخص جدید
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}