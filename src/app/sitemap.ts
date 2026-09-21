import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ALL_WEEK_NUMBERS, weekPath, DATA_UPDATED_AT } from "@/data/pregnancyWeeks";
import { ALL_BENEFITS, benefitPath } from "@/data/benefits";
import { EXAMS_UPDATED_AT, TRIMESTER_EXAMS, examPath } from "@/data/exams";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().slice(0, 10);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/ciaza-tydzien-po-tygodniu`,
      lastModified: DATA_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    { url: `${SITE_URL}/badania`, lastModified: EXAMS_UPDATED_AT, changeFrequency: "weekly", priority: 0.95 },
    {
      url: `${SITE_URL}/badania/szczepienia`,
      lastModified: EXAMS_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    { url: `${SITE_URL}/finanse`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/wyprawka`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/torba-do-szpitala`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/o-nas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/polityka-prywatnosci`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const examPages: MetadataRoute.Sitemap = TRIMESTER_EXAMS.map((t) => ({
    url: `${SITE_URL}${examPath(t)}`,
    lastModified: EXAMS_UPDATED_AT,
    changeFrequency: "monthly",
    priority: 0.86,
  }));

  const weekPages: MetadataRoute.Sitemap = ALL_WEEK_NUMBERS.map((n) => ({
    url: `${SITE_URL}${weekPath(n)}`,
    lastModified: DATA_UPDATED_AT,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const benefitPages: MetadataRoute.Sitemap = ALL_BENEFITS.map((b) => ({
    url: `${SITE_URL}${benefitPath(b)}`,
    lastModified: b.source_citations[0]?.verified ?? now,
    changeFrequency: "monthly",
    priority: b.status === "retired" ? 0.35 : 0.8,
  }));

  return [...staticPages, ...examPages, ...weekPages, ...benefitPages];
}
