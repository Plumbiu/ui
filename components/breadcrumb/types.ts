interface BreadcrumbItem {
  title: React.ReactNode
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}
