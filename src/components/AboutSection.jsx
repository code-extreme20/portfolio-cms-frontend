import { MapPin, Mail, Phone } from "lucide-react";

function AboutSection({ about }) {
  return (
    <section
      id="about"
      className="border-t border-slate-900 px-5 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl animate-fade-up">

        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            About Me
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Get to know me
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">

          <div>
            <h3 className="text-2xl font-semibold text-white">
              {about?.title || "About Me"}
            </h3>

            <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-400">
              {about?.bio ||
                "I'm a passionate developer focused on creating modern web applications."}
            </p>

            {about?.shortBio && (
              <p className="mt-5 font-medium text-blue-400">
                {about.shortBio}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="text-lg font-semibold text-white">
              Personal Details
            </h3>

            <div className="mt-6 space-y-5">

              {about?.email && (
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-400" size={20} />

                  <div>
                    <p className="text-xs text-slate-600">Email</p>
                    <p className="mt-1 break-all text-sm text-slate-300">
                      {about.email}
                    </p>
                  </div>
                </div>
              )}

              {about?.phone && (
                <div className="flex items-center gap-4">
                  <Phone className="text-blue-400" size={20} />

                  <div>
                    <p className="text-xs text-slate-600">Phone</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {about.phone}
                    </p>
                  </div>
                </div>
              )}

              {about?.location && (
                <div className="flex items-center gap-4">
                  <MapPin className="text-blue-400" size={20} />

                  <div>
                    <p className="text-xs text-slate-600">Location</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {about.location}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;