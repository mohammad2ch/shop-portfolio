
import { useState } from "react";
import { UserRoundPlus, Save, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import useCreateUser from "../../hooks/useCreateUser";

const NewUserCard = ({ onCancel }) => {
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    phone: "",
    password: "",
  });

  const { mutate: createUser, isPending: isSaving } = useCreateUser();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser(formData, {
      onSuccess: () => {
        onCancel();
      },
    });
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-brand/40 bg-surface p-5 shadow-sm">
      {/* عنوان کارت */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/20">
          <UserRoundPlus size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-text">
            {t("users.newUser")}
          </h3>

          <p className="mt-1 text-xs text-muted">
            {t("users.newUserSubtitle")}
          </p>
        </div>
      </div>

      {/* فرم اطلاعات */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs text-muted">
            {t("users.name")}
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={t("users.namePlaceholder")}
            className="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition placeholder:text-muted/60 focus:border-brand"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">
            {t("users.username")}
          </label>

          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            placeholder={t("users.usernamePlaceholder")}
            className="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition placeholder:text-muted/60 focus:border-brand"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">
            {t("users.phone")}
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            dir="ltr"
            placeholder="09xxxxxxxxx"
            className="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition placeholder:text-muted/60 focus:border-brand"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">
            {t("users.password")}
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder={t("users.passwordPlaceholder")}
            className="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition placeholder:text-muted/60 focus:border-brand"
          />
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:shadow-brand/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving ? t("users.saving") : t("users.save")}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-bg px-4 py-3 text-sm font-semibold text-muted transition hover:text-text disabled:opacity-50"
          >
            <X size={16} />
            {t("users.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUserCard;
