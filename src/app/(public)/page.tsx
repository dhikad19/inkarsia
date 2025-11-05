import MegaMenu from "@/components/Public/MegaMenu";
import ChatBot from "@/components/Public/ChatBot";
import Footer from "@/components/Public/Footer";
import ToolsList from "@/components/Public/ToolsList";
import { SubscribeButton } from "@/components/Public/NotificationButton";
export default function HomePage() {
  return (
    <section className="space-y-6">
      <MegaMenu />
      <h1 className="text-3xl font-bold">Welcome to My UI/UX Site</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Explore design inspirations, UI components, and UX case studies.
      </p>
      <SubscribeButton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Latest Articles</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Read our newest insights on design trends.
          </p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">UI Components</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Reusable components for modern apps.
          </p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Case Studies</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Deep dive into UX research and real-world projects.
          </p>
        </div>
      </div>
      <ToolsList />
      <ChatBot />
      <Footer />
    </section>
  );
}
