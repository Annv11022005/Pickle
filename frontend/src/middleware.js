// frontend/src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Lấy token và role từ cookie
  const token = request.cookies.get("pp_token")?.value;
  const role = request.cookies.get("pp_role")?.value;

  // 2. Kiểm tra các route backoffice (admin/owner)
  const isAdminRoute = pathname.startsWith("/admin");
  const isOwnerRoute = pathname.startsWith("/owner");

  if (isAdminRoute || isOwnerRoute) {
    // Nếu chưa đăng nhập -> về trang login
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      // url.searchParams.set("from", pathname); // Có thể lưu lại trang cũ để redirect sau login
      return NextResponse.redirect(url);
    }

    // Nếu đã đăng nhập nhưng sai Role
    if (isAdminRoute && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isOwnerRoute && role !== "OWNER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Chỉ chạy middleware trên các path cụ thể để tối ưu
export const config = {
  matcher: ["/admin/:path*", "/owner/:path*"],
};
