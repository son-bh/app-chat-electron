export const Media = () => {

  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-row items-center text-white">
          <img src="/images/user/avatar.avif" alt="User" />
        </div>
      ))}
    </div>
  )
}