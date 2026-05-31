import type { ContainerProps } from '../../types/tasks'

function Container({children, className} : ContainerProps) {
  return (
    <div className={`${className} w-full relative max-w-5xl`}>
      {children}
    </div>
  )
}

export default Container
