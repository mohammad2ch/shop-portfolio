import { useState } from "react";
import { Navigate } from "react-router-dom";

import {
  Users as UsersIcon,
  UserRound,
  AtSign,
  Phone,
  Pencil,
  Plus,
  Save,
  X,
  Trash2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import useUsers from "../hooks/useUsers";
import useUpdateUser from "../hooks/useUpdateUser";
import NewUserCard from "../components/users/NewUserCard";
import useDeleteUser from "../hooks/useDeleteUser";
import { toast } from "sonner";
import { useTheme } from "../context/ThemeContext";
import Swal from "sweetalert2";

const UsersTemp = () => {
  const { isAuthenticated } = useAuth();
  const { lang, t } = useLanguage();
  const { theme } = useTheme();

  const { data: users = [], isLoading, isError } = useUsers(isAuthenticated);
  //   add user
  const [isAddingUser, setIsAddingUser] = useState(false);
  // وضعیت ویرایش
  const [editingUserId, setEditingUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    phone: "",
  });

  const { mutate: updateUser, isPending: isSaving } = useUpdateUser();

  // delete
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleDelete = async (id) => {
    const isDark = theme === "dark";
    const isPersian = lang === "fa";

    const result = await Swal.fire({
      title: t("users.deleteTitle"),
      text: t("users.deleteConfirm"),
      icon: "warning",

      showCancelButton: true,
      confirmButtonText: t("users.deleteButton"),
      cancelButtonText: t("users.deleteCancel"),

      reverseButtons: isPersian,
      focusCancel: true,

      background: isDark ? "#1e293b" : "#ffffff",
      color: isDark ? "#f1f5f9" : "#1e293b",

      confirmButtonColor: "#ef4444",
      cancelButtonColor: isDark ? "#475569" : "#64748b",

      customClass: {
        popup: isPersian ? "swal-rtl" : "",
      },
    });

    if (!result.isConfirmed) return;

    deleteUser(id, {
      onSuccess: () => {
        toast.success(t("users.deleteSuccess"));
      },
      onError: () => {
        toast.error(t("users.deleteError"));
      },
    });
  };

  // شروع ویرایش
  const handleEdit = (user) => {
    setEditingUserId(user.id);

    setFormData({
      name: user.name || "",
      userName: user.userName || "",
      phone: user.phone || "",
    });
  };

  // لغو ویرایش
  const handleCancel = () => {
    setEditingUserId(null);

    setFormData({
      name: "",
      userName: "",
      phone: "",
    });
  };

  // تغییر فیلدها
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ذخیره اطلاعات
  const handleSave = () => {
    updateUser(
      {
        id: editingUserId,
        userData: formData,
      },
      {
        onSuccess: () => {
          handleCancel();
        },
      },
    );
  };

  // جلوگیری از دسترسی کاربران واردنشده
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  return (
    <main
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="mx-auto min-h-screen max-w-7xl px-4 py-10"
    >
      {/* عنوان صفحه */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-brand">
            <UsersIcon size={22} />
            <span className="text-sm font-semibold">{t("users.panel")}</span>
          </div>

          <h1 className="text-2xl font-extrabold text-text">
            {t("users.title")}
          </h1>

          <p className="mt-2 text-sm text-muted">{t("users.subtitle")}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAddingUser(true)}
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-brand/40"
          >
            <Plus size={18} />
            {t("users.addUser")}
          </button>

          <div className="rounded-2xl border border-border bg-surface px-5 py-3 text-center shadow-sm">
            <p className="text-xs text-muted">{t("users.total")}</p>
            <p className="mt-1 text-xl font-bold text-brand tabular-nums">
              {users.length}
            </p>
          </div>
        </div>
      </div>

      {/* وضعیت بارگذاری */}
      {isLoading && (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center text-muted">
          {t("users.loading")}
        </div>
      )}

      {/* خطا */}
      {isError && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center text-red-500">
          {t("users.error")}
        </div>
      )}

      {/* لیست کاربران */}
      {!isLoading && !isError && (
        <>
          {users.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface p-10 text-center text-muted">
              {t("users.empty")}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {/* // add user  */}
              {isAddingUser && (
                <NewUserCard onCancel={() => setIsAddingUser(false)} />
              )}

              {users.map((user) => (
                <div
                  key={user.id}
                  className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
                >
                  {/* هدر کارت */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/20">
                      <UserRound size={23} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-bold text-text">
                        {editingUserId === user.id ? formData.name : user.name}
                      </h3>

                      <p className="mt-1 text-xs text-muted">
                        {t("users.userId")} #{user.id}
                      </p>
                    </div>
                  </div>

                  {/* محتوای کارت */}
                  {editingUserId === user.id ? (
                    <>
                      <div className="space-y-3">
                        <div>
                          <label className="mb-1.5 block text-xs text-muted">
                            {t("users.name")}
                          </label>

                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition focus:border-brand"
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
                            className="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition focus:border-brand"
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
                            dir="ltr"
                            className="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition focus:border-brand"
                          />
                        </div>
                      </div>

                      {/* دکمه‌های ذخیره و لغو */}
                      <div className="mt-5 flex gap-2">
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={isSaving}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:shadow-brand/40 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Save size={16} />
                          {isSaving ? t("users.saving") : t("users.save")}
                        </button>

                        <button
                          type="button"
                          onClick={handleCancel}
                          disabled={isSaving}
                          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-bg px-4 py-3 text-sm font-semibold text-muted transition hover:text-text disabled:opacity-50"
                        >
                          <X size={16} />
                          {t("users.cancel")}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* اطلاعات کاربر */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 rounded-xl bg-bg/70 p-3">
                          <AtSign size={17} className="shrink-0 text-brand" />

                          <div className="min-w-0">
                            <p className="text-xs text-muted">
                              {t("users.username")}
                            </p>

                            <p className="mt-1 truncate text-sm font-semibold text-text">
                              {user.userName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-bg/70 p-3">
                          <Phone size={17} className="shrink-0 text-brand" />

                          <div className="min-w-0">
                            <p className="text-xs text-muted">
                              {t("users.phone")}
                            </p>

                            <p
                              dir="ltr"
                              className="mt-1 text-start text-sm font-semibold text-text"
                            >
                              {user.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex gap-2">
                        <div>
                          {/* دکمه ویرایش */}
                          <button
                            type="button"
                            onClick={() => handleEdit(user)}
                            className="flex  items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:shadow-brand/40 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Pencil size={16} />
                            {t("users.edit")}
                          </button>
                        </div>
                        {/* دکمه حذف  */}
                        <button
                        type="button"
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting}
                          className="flex items-center justify-center gap-2 rounded-xl border border-red-500 bg-bg px-4 py-3 text-sm font-semibold text-red-500 transition hover:text-white hover:bg-red-500 disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                          حذف کاربر
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default UsersTemp;
