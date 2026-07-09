"use client";

import { useEffect, useMemo, useState } from "react";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Button, Container, Label } from "@/components/ui";
import { AnimateIn } from "@/components/animate-in";
import { usePersistentLocale } from "@/components/use-persistent-locale";
import watermarkLogo from "@/assets/watermark.png.png";

import alsLogo from "@/assets/casses/als.png";
import cttLogo from "@/assets/casses/ctt.png";
import glsLogo from "@/assets/casses/gls.png";
import kenvueLogo from "@/assets/casses/kenvue.png";
import leroymerlinLogo from "@/assets/casses/leroymerlin.png";
import lyzerLogo from "@/assets/casses/lyzer.png";
import worten1Logo from "@/assets/casses/Worten-1.png";
import worten2Logo from "@/assets/casses/Worten-2.png";
import worten3Logo from "@/assets/casses/Worten-3.png";
import worten4Logo from "@/assets/casses/Worten-4.png";
import worten5Logo from "@/assets/casses/Worten-5.png";
import worten6Logo from "@/assets/casses/Worten-6.png";
import worten7Logo from "@/assets/casses/Worten-7.png";
import worten8Logo from "@/assets/casses/Worten-8.png";
import worten9Logo from "@/assets/casses/Worten-9.png";
import worten10Logo from "@/assets/casses/Worten-10.png";
import worten11Logo from "@/assets/casses/Worten-11.png";
import worten12Logo from "@/assets/casses/Worten-12.png";
import worten13Logo from "@/assets/casses/Worten-13.png";
import worten14Logo from "@/assets/casses/Worten-14.png";
import worten15Logo from "@/assets/casses/Worten-15.png";
import worten16Logo from "@/assets/casses/Worten-16.png";
import worten17Logo from "@/assets/casses/Worten-17.png";
import worten18Logo from "@/assets/casses/Worten-18.png";
import worten19Logo from "@/assets/casses/Worten-19.png";
import worten20Logo from "@/assets/casses/Worten-20.png";
import worten21Logo from "@/assets/casses/Worten-21.png";
import worten22Logo from "@/assets/casses/Worten-22.png";
import worten23Logo from "@/assets/casses/Worten-23.png";

const useCaseCategories = [
  {
    id: "all",
    en: {
      label: "All",
      title: "Find the use cases most relevant to your sector.",
      body: "Each card shows the challenge, the AI workflow, and the operational result in a simple format."
    },
    ar: {
      label: "الكل",
      title: "ابحث عن حالات الاستخدام الأكثر ملاءمة لقطاعك المؤسسي.",
      body: "تعرض كل بطاقة التحدي، وآلية عمل الذكاء الاصطناعي، والنتيجة التشغيلية المتوقعة ضمن قالب مبسط وسهل الاستعراض."
    }
  },
  {
    id: "retail",
    en: {
      label: "Retail & Consumer",
      title: "Margins are made in milliseconds.",
      body: "Six implementations for retailers, brands, and consumer platforms — built to handle peak-day traffic, regulated promotions, and multi-channel inventory."
    },
    ar: {
      label: "التجزئة والمستهلك",
      title: "الهوامش الربحية تُصنع في أجزاء من الثانية.",
      body: "ستة تطبيقات عملية مخصصة لقطاع التجزئة والعلامات التجارية والمنصات الاستهلاكية، صُممت للتعامل مع ذروة الطلب، والعروض الترويجية الخاضعة للضوابط، وإدارة المخزون عبر القنوات المتعددة."
    }
  },
  {
    id: "healthcare",
    en: {
      label: "Healthcare & Public",
      title: "Better triage. Faster service.",
      body: "Six implementations for hospitals, payers, ministries, and municipalities — built to clinical safety standards and audited for fairness, transparency, and PDPL/GDPR compliance."
    },
    ar: {
      label: "الرعاية الصحية والقطاع العام",
      title: "رعاية أفضل. خدمة أسرع.",
      body: "ستة تطبيقات عملية للمستشفيات وشركات التأمين والوزارات والبلديات، مصممة وفق معايير السلامة السريرية، ومدققة من حيث العدالة والشفافية، ومتوافقة مع لوائح PDPL وGDPR."
    }
  },
  {
    id: "finance",
    en: {
      label: "Finance, Legal & Compliance",
      title: "Audit-grade by default.",
      body: "Six implementations for banks, insurers, law firms, and regulators — every model documented, explainable, and rebuildable. Built to survive Basel, SAMA, DFSA, and EU AI Act scrutiny."
    },
    ar: {
      label: "التمويل والقانون والامتثال",
      title: "جاهزية فورية للتدقيق والمطابقة بشكل تلقائي.",
      body: "ستة تطبيقات للمصارف وشركات التأمين والمكاتب القانونية والجهات التنظيمية — جميع النماذج موثّقة، وقابلة للتفسير، وقابلة لإعادة البناء. مصممة لتكون متوافقة مع متطلبات التدقيق مثل Basel وSAMA وDFSA وEU AI Act."
    }
  },
  {
    id: "manufacturing",
    en: {
      label: "Manufacturing & Industrial",
      title: "Ship faster. Break less.",
      body: "Six implementations for software companies, telcos, energy operators, and engineering-led organizations — embedding AI directly into the build, run, and operate lifecycle."
    },
    ar: {
      label: "التصنيع والصناعة",
      title: "إنتاج أسرع. وأعطال أقل.",
      body: "ستة تطبيقات عملية للمصانع والمشغلين الصناعيين وشركات الطاقة والمؤسسات الهندسية — تدمج الذكاء الاصطناعي مباشرةً في دورة التصميم والتشغيل والتحسين المستمر للعمليات."
    }
  }
] as const;

type UseCaseCategory = (typeof useCaseCategories)[number]["id"];
type IndustryCategory = Exclude<UseCaseCategory, "all">;

const ICONS: Record<string, React.ReactNode> = {
  "demand-forecasting": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M3.25 3.25V20.5833C3.25 21.158 3.47827 21.7091 3.8846 22.1154C4.29093 22.5217 4.84203 22.75 5.41667 22.75H22.75" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.5 18.4167V9.75" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.083 18.4167V5.41675" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.66699 18.4167V15.1667" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "recommendation": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M23.8337 7.58325L14.6253 16.7916L9.20866 11.3749L2.16699 18.4166" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.333 7.58325H23.833V14.0833" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "customer-copilot": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M8.55866 21.6666C10.6263 22.7273 13.0048 23.0146 15.2655 22.4767C17.5262 21.9389 19.5204 20.6113 20.8889 18.7332C22.2574 16.855 22.91 14.5499 22.7293 12.2331C22.5486 9.91638 21.5463 7.74035 19.9031 6.09718C18.2599 4.454 16.0839 3.45174 13.7672 3.271C11.4504 3.09027 9.14525 3.74294 7.26713 5.1114C5.38901 6.47987 4.06141 8.47414 3.52357 10.7348C2.98573 12.9955 3.27301 15.374 4.33366 17.4416L2.16699 23.8333L8.55866 21.6666Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "content": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M16.2503 2.16675H9.75033C9.15202 2.16675 8.66699 2.65177 8.66699 3.25008V5.41675C8.66699 6.01506 9.15202 6.50008 9.75033 6.50008H16.2503C16.8486 6.50008 17.3337 6.01506 17.3337 5.41675V3.25008C17.3337 2.65177 16.8486 2.16675 16.2503 2.16675Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.333 4.33325H19.4997C20.0743 4.33325 20.6254 4.56153 21.0317 4.96785C21.4381 5.37418 21.6663 5.92528 21.6663 6.49992V21.6666C21.6663 22.2412 21.4381 22.7923 21.0317 23.1987C20.6254 23.605 20.0743 23.8333 19.4997 23.8333H6.49967C5.92504 23.8333 5.37394 23.605 4.96761 23.1987C4.56128 22.7923 4.33301 22.2412 4.33301 21.6666V6.49992C4.33301 5.92528 4.56128 5.37418 4.96761 4.96785C5.37394 4.56153 5.92504 4.33325 6.49967 4.33325H8.66634" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 11.9167H17.3333" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 17.3333H17.3333" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.66699 11.9167H8.67699" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.66699 17.3333H8.67699" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "computer-vision": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M2.23373 12.6229C2.14344 12.8661 2.14344 13.1337 2.23373 13.3769C3.11307 15.5091 4.6057 17.3321 6.5224 18.6149C8.43909 19.8977 10.6935 20.5826 12.9999 20.5826C15.3063 20.5826 17.5607 19.8977 19.4774 18.6149C21.3941 17.3321 22.8867 15.5091 23.7661 13.3769C23.8563 13.1337 23.8563 12.8661 23.7661 12.6229C22.8867 10.4907 21.3941 8.6677 19.4774 7.38488C17.5607 6.10206 15.3063 5.41724 12.9999 5.41724C10.6935 5.41724 8.43909 6.10206 6.5224 7.38488C4.6057 8.6677 3.11307 10.4907 2.23373 12.6229Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 16.25C14.7949 16.25 16.25 14.7949 16.25 13C16.25 11.2051 14.7949 9.75 13 9.75C11.2051 9.75 9.75 11.2051 9.75 13C9.75 14.7949 11.2051 16.25 13 16.25Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "loyalty": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M17.3337 22.75V20.5833C17.3337 19.4341 16.8771 18.3319 16.0645 17.5192C15.2518 16.7065 14.1496 16.25 13.0003 16.25H6.50033C5.35105 16.25 4.24885 16.7065 3.4362 17.5192C2.62354 18.3319 2.16699 19.4341 2.16699 20.5833V22.75" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.75033 11.9167C12.1436 11.9167 14.0837 9.97657 14.0837 7.58333C14.0837 5.1901 12.1436 3.25 9.75033 3.25C7.35709 3.25 5.41699 5.1901 5.41699 7.58333C5.41699 9.97657 7.35709 11.9167 9.75033 11.9167Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M23.833 22.75V20.5834C23.8323 19.6232 23.5127 18.6905 22.9245 17.9317C22.3362 17.1729 21.5126 16.6309 20.583 16.3909" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.333 3.39087C18.2651 3.62953 19.0913 4.17163 19.6813 4.93171C20.2713 5.69178 20.5915 6.6266 20.5915 7.58879C20.5915 8.55097 20.2713 9.48579 19.6813 10.2459C19.0913 11.0059 18.2651 11.548 17.333 11.7867" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "clinical-triage": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M23.8337 13.0001H21.147C20.6735 12.9991 20.2128 13.1532 19.8352 13.4388C19.4576 13.7244 19.184 14.1259 19.0562 14.5817L16.5103 23.6384C16.4939 23.6947 16.4597 23.7441 16.4128 23.7792C16.3659 23.8144 16.3089 23.8334 16.2503 23.8334C16.1917 23.8334 16.1347 23.8144 16.0878 23.7792C16.0409 23.7441 16.0067 23.6947 15.9903 23.6384L10.0103 2.36175C9.99392 2.30549 9.95971 2.25607 9.91283 2.22091C9.86595 2.18575 9.80893 2.16675 9.75033 2.16675C9.69173 2.16675 9.63471 2.18575 9.58783 2.22091C9.54095 2.25607 9.50673 2.30549 9.49033 2.36175L6.94449 11.4184C6.81716 11.8725 6.54515 12.2726 6.16976 12.5581C5.79437 12.8436 5.33609 12.9987 4.86449 13.0001H2.16699" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "medical-imaging": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M3.25 7.58333V5.41667C3.25 4.84203 3.47827 4.29093 3.8846 3.8846C4.29093 3.47827 4.84203 3.25 5.41667 3.25H7.58333" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.417 3.25H20.5837C21.1583 3.25 21.7094 3.47827 22.1157 3.8846C22.5221 4.29093 22.7503 4.84203 22.7503 5.41667V7.58333" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M22.7503 18.4167V20.5834C22.7503 21.1581 22.5221 21.7092 22.1157 22.1155C21.7094 22.5218 21.1583 22.7501 20.5837 22.7501H18.417" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.58333 22.7501H5.41667C4.84203 22.7501 4.29093 22.5218 3.8846 22.1155C3.47827 21.7092 3.25 21.1581 3.25 20.5834V18.4167" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 16.25C14.7949 16.25 16.25 14.7949 16.25 13C16.25 11.2051 14.7949 9.75 13 9.75C11.2051 9.75 9.75 11.2051 9.75 13C9.75 14.7949 11.2051 16.25 13 16.25Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.3337 17.3332L15.2754 15.2749" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "citizen-services": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M13.0003 23.8334C18.9834 23.8334 23.8337 18.9832 23.8337 13.0001C23.8337 7.017 18.9834 2.16675 13.0003 2.16675C7.01724 2.16675 2.16699 7.017 2.16699 13.0001C2.16699 18.9832 7.01724 23.8334 13.0003 23.8334Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.84766 9.74988C10.1024 9.02586 10.6051 8.41533 11.2668 8.02645C11.9285 7.63756 12.7065 7.4954 13.4629 7.62516C14.2194 7.75491 14.9055 8.1482 15.3998 8.73537C15.8941 9.32254 16.1646 10.0657 16.1635 10.8332C16.1635 12.9999 12.9135 14.0832 12.9135 14.0832" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 18.4167H13.01" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "population-health": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M22.7501 13C23.3481 13 23.8389 12.5136 23.7793 11.9189C23.5295 9.43172 22.4273 7.10746 20.6596 5.34013C18.8919 3.57281 16.5674 2.47116 14.0802 2.22195C13.4844 2.16237 12.999 2.65312 12.999 3.25112V11.9178C12.999 12.2051 13.1132 12.4807 13.3163 12.6838C13.5195 12.887 13.795 13.0011 14.0824 13.0011L22.7501 13Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M22.9773 17.2143C22.2881 18.8441 21.2101 20.2803 19.8377 21.3973C18.4652 22.5143 16.84 23.2781 15.1041 23.6219C13.3682 23.9657 11.5746 23.8791 9.87994 23.3695C8.18531 22.86 6.6413 21.9431 5.38289 20.699C4.12448 19.4548 3.19 17.9214 2.66114 16.2327C2.13228 14.544 2.02514 12.7514 2.3491 11.0118C2.67306 9.2721 3.41824 7.63826 4.5195 6.25312C5.62076 4.86797 7.04458 3.77368 8.66645 3.06592" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "document-intel": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M16.2497 2.16675H6.49967C5.92504 2.16675 5.37394 2.39502 4.96761 2.80135C4.56128 3.20768 4.33301 3.75878 4.33301 4.33341V21.6667C4.33301 22.2414 4.56128 22.7925 4.96761 23.1988C5.37394 23.6051 5.92504 23.8334 6.49967 23.8334H19.4997C20.0743 23.8334 20.6254 23.6051 21.0317 23.1988C21.4381 22.7925 21.6663 22.2414 21.6663 21.6667V7.58341L16.2497 2.16675Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.167 2.16675V6.50008C15.167 7.07472 15.3953 7.62582 15.8016 8.03215C16.2079 8.43848 16.759 8.66675 17.3337 8.66675H21.667" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.75 16.2499L11.9167 18.4166L16.25 14.0833" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "public-forecasting": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M8.66699 2.16675V6.50008" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.333 2.16675V6.50008" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.5833 4.33325H5.41667C4.22005 4.33325 3.25 5.3033 3.25 6.49992V21.6666C3.25 22.8632 4.22005 23.8333 5.41667 23.8333H20.5833C21.78 23.8333 22.75 22.8632 22.75 21.6666V6.49992C22.75 5.3033 21.78 4.33325 20.5833 4.33325Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.25 10.8333H22.75" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "fraud-aml": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M21.6663 14.0833C21.6663 19.5 17.8747 22.2083 13.368 23.7791C13.132 23.8591 12.8757 23.8553 12.6422 23.7683C8.12467 22.2083 4.33301 19.5 4.33301 14.0833V6.49996C4.33301 6.21264 4.44714 5.93709 4.65031 5.73393C4.85347 5.53076 5.12902 5.41662 5.41634 5.41662C7.58301 5.41662 10.2913 4.11662 12.1763 2.46996C12.4059 2.27387 12.6978 2.16614 12.9997 2.16614C13.3015 2.16614 13.5935 2.27387 13.823 2.46996C15.7188 4.12746 18.4163 5.41662 20.583 5.41662C20.8703 5.41662 21.1459 5.53076 21.349 5.73393C21.5522 5.93709 21.6663 6.21264 21.6663 6.49996V14.0833Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 8.66663V13" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 17.3334H13.01" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "credit-risk": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M19.5 21.6666V10.8333" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 21.6666V4.33325" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 21.6667V15.1667" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "contract-review": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M15.167 2.16675V6.50008C15.167 7.07472 15.3953 7.62582 15.8016 8.03215C16.2079 8.43848 16.759 8.66675 17.3337 8.66675H21.667" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.62334 22.7501C4.81304 23.0787 5.08569 23.3517 5.41403 23.5418C5.74236 23.7319 6.11486 23.8325 6.49426 23.8334H19.4997C20.0743 23.8334 20.6254 23.6051 21.0317 23.1988C21.4381 22.7925 21.6663 22.2414 21.6663 21.6667V7.58341L16.2497 2.16675H6.49967C5.92504 2.16675 5.37394 2.39502 4.96761 2.80135C4.56128 3.20768 4.33301 3.75878 4.33301 4.33341V7.58341" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.75 19.5L8.125 17.875" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.41699 18.4167C7.21192 18.4167 8.66699 16.9617 8.66699 15.1667C8.66699 13.3718 7.21192 11.9167 5.41699 11.9167C3.62207 11.9167 2.16699 13.3718 2.16699 15.1667C2.16699 16.9617 3.62207 18.4167 5.41699 18.4167Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "regulatory": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M16.2497 2.16675H6.49967C5.92504 2.16675 5.37394 2.39502 4.96761 2.80135C4.56128 3.20768 4.33301 3.75878 4.33301 4.33341V21.6667C4.33301 22.2414 4.56128 22.7925 4.96761 23.1988C5.37394 23.6051 5.92504 23.8334 6.49967 23.8334H19.4997C20.0743 23.8334 20.6254 23.6051 21.0317 23.1988C21.4381 22.7925 21.6663 22.2414 21.6663 21.6667V7.58341L16.2497 2.16675Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.167 2.16675V6.50008C15.167 7.07472 15.3953 7.62582 15.8016 8.03215C16.2079 8.43848 16.759 8.66675 17.3337 8.66675H21.667" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.8337 9.75H8.66699" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.3337 14.0833H8.66699" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.3337 18.4167H8.66699" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "kyc": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M17.3337 22.75V20.5833C17.3337 19.4341 16.8771 18.3319 16.0645 17.5192C15.2518 16.7065 14.1496 16.25 13.0003 16.25H6.50033C5.35105 16.25 4.24885 16.7065 3.4362 17.5192C2.62354 18.3319 2.16699 19.4341 2.16699 20.5833V22.75" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.75033 11.9167C12.1436 11.9167 14.0837 9.97657 14.0837 7.58333C14.0837 5.1901 12.1436 3.25 9.75033 3.25C7.35709 3.25 5.41699 5.1901 5.41699 7.58333C5.41699 9.97657 7.35709 11.9167 9.75033 11.9167Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.333 11.9167L19.4997 14.0833L23.833 9.75" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "compliance": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M11.9167 20.5833C16.7031 20.5833 20.5833 16.7031 20.5833 11.9167C20.5833 7.1302 16.7031 3.25 11.9167 3.25C7.1302 3.25 3.25 7.1302 3.25 11.9167C3.25 16.7031 7.1302 20.5833 11.9167 20.5833Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M22.7501 22.7499L18.0918 18.0916" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "predictive-maintenance": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M13 15.1667L17.3333 10.8334" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.61866 20.5834C2.66773 18.9365 2.16706 17.0683 2.16699 15.1666C2.16692 13.2649 2.66744 11.3967 3.61825 9.74979C4.56905 8.10285 5.93664 6.73521 7.58354 5.78435C9.23044 4.83348 11.0986 4.33289 13.0003 4.33289C14.902 4.33289 16.7702 4.83348 18.4171 5.78435C20.064 6.73521 21.4316 8.10285 22.3824 9.74979C23.3332 11.3967 23.8337 13.2649 23.8337 15.1666C23.8336 17.0683 23.3329 18.9365 22.382 20.5834" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "visual-inspection": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M22.75 10.8334V8.66672C22.7496 8.28677 22.6493 7.9136 22.4592 7.58465C22.269 7.2557 21.9957 6.98253 21.6667 6.79256L14.0833 2.45922C13.754 2.26906 13.3803 2.16895 13 2.16895C12.6197 2.16895 12.246 2.26906 11.9167 2.45922L4.33333 6.79256C4.00428 6.98253 3.73098 7.2557 3.54083 7.58465C3.35069 7.9136 3.25039 8.28677 3.25 8.66672V17.3334C3.25039 17.7133 3.35069 18.0865 3.54083 18.4155C3.73098 18.7444 4.00428 19.0176 4.33333 19.2076L11.9167 23.5409C12.246 23.7311 12.6197 23.8312 13 23.8312C13.3803 23.8312 13.754 23.7311 14.0833 23.5409L16.25 22.3059" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.125 4.62585L17.875 10.205" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.56445 7.58337L13.0003 13L22.4361 7.58337" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 23.8333V13" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.0413 19.5C21.5371 19.5 22.7497 18.2875 22.7497 16.7917C22.7497 15.2959 21.5371 14.0834 20.0413 14.0834C18.5456 14.0834 17.333 15.2959 17.333 16.7917C17.333 18.2875 18.5456 19.5 20.0413 19.5Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M21.959 18.7092L23.8332 20.5834" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "production-scheduling": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M8.66699 2.16663V6.49996" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.333 2.16663V6.49996" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.5833 4.33337H5.41667C4.22005 4.33337 3.25 5.30342 3.25 6.50004V21.6667C3.25 22.8633 4.22005 23.8334 5.41667 23.8334H20.5833C21.78 23.8334 22.75 22.8633 22.75 21.6667V6.50004C22.75 5.30342 21.78 4.33337 20.5833 4.33337Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.25 10.8334H22.75" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.66699 15.1666H8.67699" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 15.1666H13.01" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.333 15.1666H17.343" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.66699 19.5H8.67699" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 19.5H13.01" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.333 19.5H17.343" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "supply-chain": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M11.9167 23.5409C12.246 23.7311 12.6197 23.8312 13 23.8312C13.3803 23.8312 13.754 23.7311 14.0833 23.5409L21.6667 19.2076C21.9957 19.0176 22.269 18.7444 22.4592 18.4155C22.6493 18.0865 22.7496 17.7133 22.75 17.3334V8.66672C22.7496 8.28677 22.6493 7.9136 22.4592 7.58465C22.269 7.2557 21.9957 6.98253 21.6667 6.79256L14.0833 2.45922C13.754 2.26906 13.3803 2.16895 13 2.16895C12.6197 2.16895 12.246 2.26906 11.9167 2.45922L4.33333 6.79256C4.00428 6.98253 3.73098 7.2557 3.54083 7.58465C3.35069 7.9136 3.25039 8.28677 3.25 8.66672V17.3334C3.25039 17.7133 3.35069 18.0865 3.54083 18.4155C3.73098 18.7444 4.00428 19.0176 4.33333 19.2076L11.9167 23.5409Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 23.8333V13" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.56445 7.58337L13.0003 13L22.4361 7.58337" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.125 4.62585L17.875 10.205" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "energy": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M4.33312 15.1666C4.12812 15.1673 3.92712 15.1099 3.75349 15.0009C3.57985 14.8919 3.44071 14.7359 3.35222 14.5509C3.26373 14.366 3.22952 14.1598 3.25358 13.9562C3.27764 13.7526 3.35897 13.56 3.48812 13.4008L14.2131 2.35081C14.2936 2.25794 14.4032 2.19519 14.524 2.17285C14.6448 2.15051 14.7697 2.1699 14.878 2.22785C14.9863 2.2858 15.0718 2.37886 15.1202 2.49176C15.1687 2.60465 15.1774 2.73068 15.1448 2.84914L13.0648 9.37081C13.0035 9.53496 12.9829 9.71154 13.0048 9.8854C13.0267 10.0593 13.0904 10.2252 13.1906 10.369C13.2907 10.5128 13.4242 10.6302 13.5797 10.7111C13.7351 10.7919 13.9079 10.8339 14.0831 10.8333H21.6665C21.8715 10.8326 22.0725 10.8901 22.2461 10.9991C22.4197 11.1081 22.5589 11.2641 22.6474 11.449C22.7359 11.6339 22.7701 11.8402 22.746 12.0438C22.7219 12.2474 22.6406 12.4399 22.5115 12.5991L11.7865 23.6491C11.706 23.742 11.5964 23.8048 11.4756 23.8271C11.3547 23.8494 11.2299 23.83 11.1216 23.7721C11.0132 23.7141 10.9278 23.6211 10.8793 23.5082C10.8309 23.3953 10.8222 23.2693 10.8548 23.1508L12.9348 16.6291C12.9961 16.465 13.0167 16.2884 12.9948 16.1145C12.9729 15.9407 12.9092 15.7747 12.809 15.6309C12.7089 15.4871 12.5754 15.3697 12.4199 15.2889C12.2644 15.208 12.0917 15.1661 11.9165 15.1666H4.33312Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "worker-safety": <svg width="22" height="22" viewBox="0 0 26 26" fill="none"><path d="M21.6663 14.0834C21.6663 19.5001 17.8747 22.2084 13.368 23.7792C13.132 23.8592 12.8757 23.8554 12.6422 23.7684C8.12467 22.2084 4.33301 19.5001 4.33301 14.0834V6.50008C4.33301 6.21276 4.44714 5.93721 4.65031 5.73405C4.85347 5.53088 5.12902 5.41675 5.41634 5.41675C7.58301 5.41675 10.2913 4.11675 12.1763 2.47008C12.4059 2.274 12.6978 2.16626 12.9997 2.16626C13.3015 2.16626 13.5935 2.274 13.823 2.47008C15.7188 4.12758 18.4163 5.41675 20.583 5.41675C20.8703 5.41675 21.1459 5.53088 21.349 5.73405C21.5522 5.93721 21.6663 6.21276 21.6663 6.50008V14.0834Z" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const useCaseCards: Array<{
  category: IndustryCategory;
  icon: string;
  en: { title: string; body: string; tags: [string, string] };
  ar: { title: string; body: string; tags: [string, string] };
}> = [
  { category: "retail", icon: "demand-forecasting", en: { title: "Demand Forecasting", body: "Inventory and demand signals are scattered across channels.", tags: ["Inventory", "Planning"] }, ar: { title: "التنبؤ بالطلب", body: "إشارات الطلب والمخزون موزعة عبر قنوات متعددة.", tags: ["المخزون", "التخطيط"] } },
  { category: "retail", icon: "recommendation", en: { title: "Dynamic Pricing", body: "Pricing decisions move slower than market changes.", tags: ["Pricing", "Revenue"] }, ar: { title: "التسعير الديناميكي", body: "قرارات التسعير أبطأ من وتيرة تغيرات السوق.", tags: ["التسعير", "الإيرادات"] } },
  { category: "retail", icon: "customer-copilot", en: { title: "Customer Copilot", body: "Support teams repeat the same answers across channels.", tags: ["Customer Care", "Response Time"] }, ar: { title: "مساعد العملاء الذكي", body: "تكرر فرق الدعم الإجابات نفسها عبر القنوات المختلفة.", tags: ["العملاء", "سرعة الاستجابة"] } },
  { category: "retail", icon: "content", en: { title: "Content Automation", body: "Teams need consistent content for many products and channels.", tags: ["Content", "Production Speed"] }, ar: { title: "أتمتة المحتوى", body: "تحتاج الفرق إلى محتوى متسق عبر عدد كبير من المنتجات والقنوات.", tags: ["المحتوى", "سرعة الإنتاج"] } },
  { category: "retail", icon: "computer-vision", en: { title: "In-store Computer Vision", body: "Operations teams need better visibility into shelves and stores.", tags: ["Store Ops", "Loss Prevention"] }, ar: { title: "الرؤية الحاسوبية داخل المتاجر", body: "تحتاج فرق العمليات إلى رؤية أوضح لحالة الأرفف والمتاجر.", tags: ["عمليات المتاجر", "منع الخسائر وسرقة المخزون"] } },
  { category: "retail", icon: "loyalty", en: { title: "Loyalty Segmentation", body: "Customers receive generic campaigns that do not match behaviour.", tags: ["Retention", "Engagement"] }, ar: { title: "تقسيم العملاء وبرامج الولاء", body: "يتلقى العملاء حملات عامة لا تعكس سلوكهم الفعلي.", tags: ["استبقاء العملاء", "تعزيز التفاعل"] } },
  { category: "healthcare", icon: "clinical-triage", en: { title: "Clinical Triage", body: "Teams need safer prioritization and faster routing.", tags: ["Patient Care", "Patient Flow"] }, ar: { title: "الفرز الطبي", body: "تحتاج الفرق الطبية إلى تحديد الأولويات وتحويل الحالات بشكل أسرع وأكثر أمانًا.", tags: ["رعاية المرضى", "تدفق وحركة المرضى"] } },
  { category: "healthcare", icon: "medical-imaging", en: { title: "Medical Imaging Support", body: "Clinical teams need decision support for high-volume imaging workflows.", tags: ["Radiology", "Review Speed"] }, ar: { title: "دعم تحليل الأشعة والصور الطبية", body: "تحتاج الفرق الطبية إلى أدوات دعم لاتخاذ القرار في بيئات التصوير ذات الأحجام الكبيرة.", tags: ["الأشعة", "سرعة المراجعة والتشخيص"] } },
  { category: "healthcare", icon: "citizen-services", en: { title: "Citizen Services Copilot", body: "Citizens need answers across complex services and regulations.", tags: ["Public Service", "Service Access"] }, ar: { title: "مساعد الخدمات الحكومية", body: "يحتاج المواطنون إلى إجابات واضحة حول الخدمات والأنظمة المعقدة.", tags: ["الخدمات العامة", "الوصول إلى الخدمات"] } },
  { category: "healthcare", icon: "population-health", en: { title: "Population Health Analytics", body: "Health leaders need insight across programs and communities.", tags: ["Population Health", "Planning"] }, ar: { title: "تحليلات صحة المجتمع", body: "يحتاج صناع القرار إلى رؤى شاملة عبر البرامج والمجتمعات المختلفة.", tags: ["صحة المجتمع", "التخطيط الاستراتيجي"] } },
  { category: "healthcare", icon: "document-intel", en: { title: "Document Intelligence", body: "Forms and records create manual bottlenecks.", tags: ["Administration", "Processing Speed"] }, ar: { title: "الذكاء الاصطناعي للمستندات والوثائق", body: "تؤدي النماذج والسجلات إلى اختناقات تشغيلية يدوية.", tags: ["الإدارة", "سرعة معالجة المعاملات"] } },
  { category: "healthcare", icon: "public-forecasting", en: { title: "Public Sector Forecasting", body: "Institutions need to anticipate demand, service pressure, and operational gaps.", tags: ["Service Demand", "Proactive Ops"] }, ar: { title: "التنبؤ في القطاع العام", body: "تحتاج المؤسسات إلى توقع الطلب وضغوط الخدمات والفجوات التشغيلية.", tags: ["الطلب على الخدمات", "العمليات الاستباقية"] } },
  { category: "finance", icon: "fraud-aml", en: { title: "Fraud and AML Detection", body: "Suspicious patterns are hard to catch manually.", tags: ["AML / KYC", "Detection"] }, ar: { title: "كشف الاحتيال ومكافحة غسل الأموال", body: "يصعب اكتشاف الأنماط المشبوهة يدويًا.", tags: ["مكافحة غسل الأموال / اعرف عميلك", "الرصد الذكي"] } },
  { category: "finance", icon: "credit-risk", en: { title: "Credit Risk Intelligence", body: "Risk teams need better views of borrower behaviour and financial signals.", tags: ["Credit Risk", "Risk Review"] }, ar: { title: "ذكاء مخاطر الائتمان", body: "تحتاج فرق المخاطر إلى رؤية أعمق لسلوك المقترضين والمؤشرات المالية.", tags: ["مخاطر الائتمان", "مراجعة وتقييم المخاطر"] } },
  { category: "finance", icon: "contract-review", en: { title: "Contract Review", body: "Legal review is slow and repetitive.", tags: ["Legal", "Workflow Speed"] }, ar: { title: "مراجعة العقود", body: "تستغرق المراجعات القانونية وقتًا طويلًا وتتضمن أعمالًا متكررة.", tags: ["الشؤون القانونية", "سرعة مسار العمل"] } },
  { category: "finance", icon: "regulatory", en: { title: "Regulatory Reporting", body: "Reporting requires multiple data and document sources.", tags: ["Compliance", "Audit-Ready"] }, ar: { title: "التقارير التنظيمية", body: "يتطلب إعداد التقارير الاعتماد على مصادر بيانات ومستندات متعددة.", tags: ["الامتثال", "الجاهزية للتدقيق الرقابي"] } },
  { category: "finance", icon: "kyc", en: { title: "KYC Copilot", body: "Onboarding teams need to review identity, documents, and risk signals.", tags: ["Onboarding", "Review Speed"] }, ar: { title: "مساعد اعرف عميلك (KYC)", body: "تحتاج فرق تسجيل العملاء إلى مراجعة الهوية والمستندات ومؤشرات المخاطر.", tags: ["تسجيل وتأهيل العملاء", "سرعة المراجعة"] } },
  { category: "finance", icon: "compliance", en: { title: "Compliance Surveillance", body: "Teams need to identify risky communication and transaction patterns.", tags: ["Surveillance", "Escalation"] }, ar: { title: "مراقبة الامتثال", body: "تحتاج الفرق إلى اكتشاف أنماط الاتصال والمعاملات عالية المخاطر.", tags: ["الرقابة والمتابعة", "التصعيد والمتابعة"] } },
  { category: "manufacturing", icon: "predictive-maintenance", en: { title: "Predictive Maintenance", body: "Equipment failures are unpredictable and cause unplanned downtime.", tags: ["Asset Health", "Downtime"] }, ar: { title: "الصيانة التنبؤية", body: "أعطال المعدات غير متوقعة وتؤدي إلى توقفات تشغيلية غير مخططة.", tags: ["سلامة الأصول والآلات", "تقليل وقت التوقف"] } },
  { category: "manufacturing", icon: "visual-inspection", en: { title: "Visual Quality Inspection", body: "Manual inspection is slow, inconsistent, and hard to scale.", tags: ["Quality", "Defect Detection"] }, ar: { title: "الفحص البصري للجودة", body: "عمليات الفحص اليدوي بطيئة وغير متسقة ويصعب توسيع نطاقها.", tags: ["الجودة", "رصد العيوب المصنعية"] } },
  { category: "manufacturing", icon: "production-scheduling", en: { title: "Production Scheduling", body: "Schedule optimization requires coordinating many competing constraints.", tags: ["Planning", "Throughput"] }, ar: { title: "جدولة الإنتاج", body: "يتطلب تحسين الجداول التنسيق بين العديد من القيود والمتغيرات.", tags: ["التخطيط", "حجم الإنتاجية الكلية"] } },
  { category: "manufacturing", icon: "supply-chain", en: { title: "Supply Chain Forecasting", body: "Supply chain variability creates excess stock or shortages.", tags: ["Supply Chain", "Inventory"] }, ar: { title: "التنبؤ بسلسلة الإمداد", body: "تؤدي تقلبات سلسلة الإمداد إلى فائض أو نقص في المخزون.", tags: ["سلاسل الإمداد", "المخزون"] } },
  { category: "manufacturing", icon: "energy", en: { title: "Energy & Process Optimization", body: "Energy and process inefficiencies are hard to identify in real time.", tags: ["Sustainability", "OEE"] }, ar: { title: "تحسين الطاقة والعمليات", body: "يصعب تحديد الهدر التشغيلي واستهلاك الطاقة غير الفعّال في الوقت الفعلي.", tags: ["الاستدامة", "الفعالية الإجمالية للمعدات (OEE)"] } },
  { category: "manufacturing", icon: "worker-safety", en: { title: "Worker Safety Monitoring", body: "Safety risks are hard to detect before incidents occur.", tags: ["EHS", "Compliance"] }, ar: { title: "مراقبة سلامة العاملين", body: "يصعب اكتشاف مخاطر السلامة قبل وقوع الحوادث.", tags: ["البيئة والصحة والسلامة (EHS)", "الامتثال"] } },
];

// Logos ordered by category group; sliced by LOGO_SLICES per active filter.
// Retail: 0-6 (7), Healthcare: 7-12 (6), Finance: 13-20 (8), Manufacturing: 21-28 (8)
const allLogos = [
  alsLogo, cttLogo, glsLogo, kenvueLogo, leroymerlinLogo, lyzerLogo, worten1Logo,
  worten2Logo, worten3Logo, worten4Logo, worten5Logo, worten6Logo, worten7Logo,
  worten8Logo, worten9Logo, worten10Logo, worten11Logo, worten12Logo, worten13Logo, worten14Logo, worten15Logo,
  worten16Logo, worten17Logo, worten18Logo, worten19Logo, worten20Logo, worten21Logo, worten22Logo, worten23Logo,
];

const LOGO_SLICES: Record<UseCaseCategory, [number, number]> = {
  all: [0, 29],
  retail: [0, 7],
  healthcare: [7, 13],
  finance: [13, 21],
  manufacturing: [21, 29],
};

const pageCopy = {
  en: {
    heroLabel: "Use cases",
    heroTitleBefore: "Enterprise AI patterns, organized by ",
    heroTitleAccent: "business problem.",
    heroBody: "Explore practical AI patterns across retail, healthcare, finance, public sector, technology, and engineering teams.",
    browse: "Browse use cases",
    discuss: "Discuss your use case",
    libraryLabel: "Use-case library",
    enterpriseLabel: "Enterprise environments",
    operationalLabel: "Operational contexts",
    enterpriseTitle: "Designed for real operational contexts.",
    operationalTitle: "Built for the tools teams already use.",
    ctaTitle: "Have a use case in mind?",
    ctaBody: "Share the problem, data sources, and target workflow. Adopters can map it to the right service or product path.",
    ctaDiscuss: "Discuss use case",
    ctaProducts: "View products"
  },
  ar: {
    heroLabel: "حالات الاستخدام",
    heroTitleBefore: "أنماط تطبيقات الذكاء الاصطناعي المؤسسية، منظمة وفقًا ",
    heroTitleAccent: "لتحديات واحتياجات الأعمال.",
    heroBody: "استكشف تطبيقات عملية للذكاء الاصطناعي عبر قطاعات التجزئة، والرعاية الصحية، والتمويل، والقطاع العام، والتكنولوجيا، والهندسة.",
    browse: "استكشف حالات الاستخدام",
    discuss: "ناقش حالة الاستخدام الخاصة بك",
    libraryLabel: "حالات الاستخدام",
    enterpriseLabel: "بيئات المؤسسات",
    operationalLabel: "سياقات تشغيلية",
    enterpriseTitle: "مصمم ليتناسب مع البيئات التشغيلية الحقيقية.",
    operationalTitle: "مصمم للعمل مع الأدوات التي تعتمدها الفرق بالفعل.",
    ctaTitle: "هل لديك حالة استخدام محددة؟",
    ctaBody: "شارك المشكلة ومصادر البيانات وسير العمل المستهدف، وسيساعدك فريق Adopters في تحديد الخدمة أو المنتج الأنسب لاحتياجاتك.",
    ctaDiscuss: "ناقش حالة الاستخدام",
    ctaProducts: "عرض المنتجات"
  }
} as const;

export function UseCasesPage() {
  const [locale, setLocale] = usePersistentLocale();
  const isAr = locale === "ar";
  const content = pageCopy[locale];
  const [activeCategory, setActiveCategory] = useState<UseCaseCategory>("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") as UseCaseCategory | null;
    const valid = useCaseCategories.map((c) => c.id);
    if (cat && valid.includes(cat)) {
      setActiveCategory(cat);
    }
  }, []);

  const activeMeta = useCaseCategories.find((category) => category.id === activeCategory) ?? useCaseCategories[0];
  const activeCopy = activeMeta[locale];
  const visibleCards = useMemo(
    () => (activeCategory === "all" ? useCaseCards : useCaseCards.filter((useCase) => useCase.category === activeCategory)),
    [activeCategory]
  );
  const visibleLogos = useMemo(() => {
    const [start, end] = LOGO_SLICES[activeCategory];
    return allLogos.slice(start, end);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-paper" dir={isAr ? "rtl" : "ltr"} lang={locale}>
      <SiteHeader active="Use Cases" locale={locale} setLocale={setLocale} />

      <section className="hero-grid relative text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            aria-hidden="true"
            className={`absolute top-0 w-[52%] max-w-[800px] select-none opacity-[0.38] ${isAr ? "left-0 -scale-x-100" : "right-0"}`}
            src={watermarkLogo.src}
          />
        </div>
        <Container className={`relative z-10 flex min-h-[460px] items-center py-20 lg:py-24 ${isAr ? "text-right" : ""}`}>
          <div className="max-w-[650px]">
            <Label dark>{content.heroLabel}</Label>
            <h1 className={`mt-5 font-black ${isAr ? "text-[42px] md:text-[56px]" : "text-5xl leading-[1.02] md:text-[60px]"}`}>
              {content.heroTitleBefore}
              <span className="text-gradient-green">{content.heroTitleAccent}</span>
            </h1>
            <p className="mt-7 max-w-[590px] text-lg leading-8 text-muted-dark">{content.heroBody}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href="#use-case-filter">
                {content.browse} {isAr ? "←" : "→"}
              </Button>
              <Button href="/contact" variant="outline">
                {content.discuss}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-24 text-[#031915] md:py-[118px]" id="use-case-filter">
        <Container className={isAr ? "text-right" : ""}>
          <div className={`grid ${isAr ? "max-w-[780px] gap-5" : "items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]"}`}>
            <div>
              <Label>{content.libraryLabel}</Label>
              <h2 className="mt-4 text-4xl font-black leading-[1.02] md:text-5xl">
                {activeCopy.title}
              </h2>
            </div>
            <p className={`${isAr ? "max-w-[700px]" : "max-w-[480px]"} text-base leading-7 text-muted-light`}>{activeCopy.body}</p>
          </div>

          <div className="mt-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0" role="tablist" aria-label="Use case categories">
            {useCaseCategories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  aria-selected={isActive}
                  className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs font-black transition active:scale-95 ${
                    isActive
                      ? "border-[#031915] bg-[#031915] text-white shadow-[0_8px_20px_rgba(0,31,24,0.12)]"
                      : "border-border-light bg-white text-[#55665f] hover:border-[#0d8d6b] hover:bg-[#f0f5f3] hover:text-[#031915]"
                  }`}
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  role="tab"
                  type="button"
                >
                  {category[locale].label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleCards.map((useCase, index) => {
              const cardCopy = useCase[locale];
              return (
                <AnimateIn delay={(index % 3) * 100} key={`${useCase.category}-${cardCopy.title}`} variant="up">
                <article
                  className={`relative flex h-full min-h-[265px] flex-col items-start rounded-[8px] border border-[#dde4e1] bg-white pb-[22px] pt-8 shadow-[0_18px_44px_0_rgba(3,25,21,0.08)] ${isAr ? "pe-10 ps-7 text-right" : "ps-10 pe-7"}`}
                >
                  <span className={`pointer-events-none absolute top-[1px] h-[calc(100%-2px)] w-[6px] ${isAr ? "right-[1px] rounded-[0_8px_8px_0]" : "left-[1px] rounded-[8px_0_0_8px]"} bg-[#1e7770]`} />
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[rgba(30,119,112,0.12)] text-lg text-[#1e7770]">
                      {ICONS[useCase.icon] ?? null}
                    </span>
                    <h3 className="text-[18px] font-black leading-[1.15] text-[#031915]">{cardCopy.title}</h3>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-[#4a5c57]">{cardCopy.body}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {cardCopy.tags.map((tag, i) => (
                      <span
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${
                          i === 0
                            ? "border-transparent bg-[rgba(30,119,112,0.12)] text-[#1e7770]"
                            : "border-[#dde4e1] bg-white text-[#4a5c57]"
                        }`}
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
                </AnimateIn>
              );
            })}
          </div>

          <div className="mt-14">
            <Label>{activeCategory === "all" ? content.enterpriseLabel : content.operationalLabel}</Label>
            <h3 className="mt-4 max-w-[520px] text-3xl font-black leading-[1.1]">
              {activeCategory === "all" ? content.enterpriseTitle : content.operationalTitle}
            </h3>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {visibleLogos.map((logo) => (
                <div className="grid h-[56px] place-items-center rounded-md border border-border-light bg-white px-2" key={logo.src}>
                  <img alt="" className="max-h-8 w-full object-contain" src={logo.src} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper pb-24 md:pb-[118px]">
        <Container>
          <div className="overflow-hidden rounded-2xl bg-[linear-gradient(100deg,#52f35f_0%,#46ef93_58%,#55efbd_100%)] p-8 text-[#031915] md:p-14">
            <div className="grid gap-8 md:grid-cols-[1fr_345px] md:items-center">
              <div className={isAr ? "text-right" : ""}>
                <h2 className="text-4xl font-black md:text-5xl">{content.ctaTitle}</h2>
                <p className="mt-4 max-w-[700px] text-sm font-semibold leading-6 text-[#083429] opacity-80">{content.ctaBody}</p>
              </div>
              <div className="grid gap-3">
                <Button className="w-full !text-white" href="/contact" variant="dark">
                  {content.ctaDiscuss} {isAr ? "←" : "→"}
                </Button>
                <Button className="w-full" href="/products" variant="light">
                  {content.ctaProducts}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
