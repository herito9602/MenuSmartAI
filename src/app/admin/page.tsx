import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  // Redirect /admin to the menu editor by default
  redirect('/admin/menu');
}
