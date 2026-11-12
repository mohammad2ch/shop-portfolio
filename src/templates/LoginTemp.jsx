import { useState } from "react";
import {
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthToast from "../components/AuthToast";

const LoginTemp = () => {
  const { t, lang } = useLanguage();
  const isRtl = lang === "fa";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login({
        username,
        password,
      });

      // ورود موفق
      toast.custom((id) => <AuthToast id={id} success={true} />, {
        duration: 4000,
      });

      navigate(-1);
    } catch (error) {
      // ورود ناموفق
      toast.custom(
        (id) => <AuthToast id={id} success={false} message={error.message} />,
        { duration: 4000 },
      );
    }
  };

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-5 py-12"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/20">
            <ShoppingBag size={30} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            {t("login.title")}
          </h1>

          <p className="mt-2 text-sm text-muted">{t("login.subtitle")}</p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-black/5 sm:p-9">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                {t("login.username")}
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute start-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("login.username.placeholder")}
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-border bg-background py-3.5 ps-12 pe-4 text-sm outline-none transition-all placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                {t("login.password")}
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute start-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("login.password.placeholder")}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-border bg-background py-3.5 ps-12 pe-12 text-sm outline-none transition-all placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? t("login.hidePassword")
                      : t("login.showPassword")
                  }
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-brand"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <label className="flex cursor-pointer items-center gap-2 text-muted">
                <input type="checkbox" className="h-4 w-4 accent-brand" />
                {t("login.remember")}
              </label>

              <button
                type="button"
                className="font-semibold text-brand transition-colors hover:opacity-70"
              >
                {t("login.forgot")}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              {t("login.submit")}

              <ArrowLeft
                size={17}
                className={`transition-transform group-hover:-translate-x-1 ${
                  isRtl ? "" : "rotate-180"
                }`}
              />
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />

            <span className="text-xs text-muted">{t("login.or")}</span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Register */}
          <div className="text-center">
            <p className="text-sm text-muted">{t("login.noAccount")}</p>

            <button
              type="button"
              className="mt-3 w-full rounded-xl border border-brand/40 bg-brand/5 py-3 text-sm font-bold text-brand transition-all hover:border-brand hover:bg-brand/10"
            >
              {t("login.register")}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted">
          {t("login.footer")}
        </p>
      </div>
    </section>
  );
};

export default LoginTemp;
