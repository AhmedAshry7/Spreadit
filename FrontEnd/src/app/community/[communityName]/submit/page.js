"use client";
import RealSubmit from "@/app/submit/page.js";

/**
 * Shortcut to submit page from a community
 * @component
 * @param   {string} [currentCommunity=""]   The name of the current community if you were inside a community when creating
 * @param   {boolean} [isScheduled]   Redirected from scheduled post page?
 * @returns {JSX.Element} The rendered Submit component.
 *
 * @example
 * // Renders the Submit component with default props (from home page for example)
 * <Submit />;
 * @example
 * // Renders the Submit component with a specified currentCommunity (while you were in community)
 * <Submit currentCommunity="ExampleCommunity" />;
 */
function Submit({ params: { communityName } }) {
  return <RealSubmit currentCommunity={communityName} />;
}

export default Submit;
