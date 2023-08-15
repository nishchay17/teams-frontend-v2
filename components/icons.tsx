import {
  AlertTriangle,
  ArrowRight,
  CheckSquare,
  User2,
  File,
  PlusIcon,
  Kanban,
  LucideProps,
  ListPlus,
  Settings,
  RotateCw,
  Archive,
  type Icon as LucideIcon,
  ArrowLeft,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons: { [key: string]: Icon } = {
  checkBox: CheckSquare,
  warning: AlertTriangle,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  profile: User2,
  file: File,
  add: PlusIcon,
  archive: Archive,
  manage: Kanban,
  setting: Settings,
  "add-list": ListPlus,
  reload: RotateCw,
  hero: (props: LucideProps) => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.2406 58.3529C25.4434 60.1532 31.0417 60.4851 36.4209 59.3122C41.8 58.1394 46.752 55.5071 50.7332 51.7044C54.7143 47.9016 57.5708 43.0755 58.989 37.7557C60.4071 32.436 60.3321 26.8284 58.7722 21.5485L47.8669 24.7704C48.8348 28.0465 48.8813 31.5259 48.0014 34.8266C47.1214 38.1274 45.3491 41.1219 42.8788 43.4814C40.4086 45.841 37.336 47.4742 33.9984 48.202C30.6608 48.9297 27.1871 48.7238 23.9589 47.6067L20.2406 58.3529Z"
        fill="#E14D59"
      />
      <path
        d="M59.9242 29.9621C59.9242 24.0362 58.167 18.2433 54.8747 13.3161C51.5824 8.38881 46.903 4.54849 41.4281 2.28073C35.9532 0.0129686 29.9289 -0.580381 24.1168 0.575714C18.3047 1.73181 12.966 4.58542 8.7757 8.7757C4.58542 12.966 1.73181 18.3047 0.575713 24.1168C-0.580381 29.9289 0.0129687 35.9533 2.28073 41.4281C4.54849 46.903 8.38881 51.5824 13.3161 54.8747C18.2433 58.167 24.0362 59.9242 29.9621 59.9242L29.9621 48.5529C26.2852 48.5529 22.6909 47.4626 19.6336 45.4198C16.5764 43.377 14.1935 40.4735 12.7864 37.0765C11.3794 33.6795 11.0112 29.9415 11.7285 26.3352C12.4459 22.729 14.2165 19.4164 16.8164 16.8164C19.4164 14.2165 22.729 12.4459 26.3352 11.7285C29.9415 11.0112 33.6795 11.3794 37.0765 12.7865C40.4735 14.1935 43.377 16.5764 45.4198 19.6336C47.4626 22.6909 48.5529 26.2852 48.5529 29.9621H59.9242Z"
        fill="#FDC960"
      />
    </svg>
  ),
  loader: (props: LucideProps) => (
    <svg
      aria-hidden="true"
      role="status"
      className="w-3 h-3 ml-2 text-white animate-spin"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#242424"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  ),
};
