import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
  // The redirect function automatically handles the response, so no need to return null explicitly
  // unless there's a specific reason for it in a more complex scenario.
  // For a simple redirect, this is sufficient.
}
