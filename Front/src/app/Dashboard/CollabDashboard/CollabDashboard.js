import FusePageSimple from "@fuse/core/FusePageSimple/FusePageSimple"
import CollabDashboardAppHeader from "./CollabDashboardAppHeader"
import GenderDashboard from "./GenderDashboard/GenderDashboard.js"

function CollabDashboard() {
  return (
    <FusePageSimple
      header={<CollabDashboardAppHeader />}
      content={
        <>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32"
            // variants={container}
            initial="hidden"
            animate="show"
          >
             <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full">
                  <div className="">
                    <GenderDashboard/>
                  </div>
             </div>

          </div>
        </>
      }
    >


    </FusePageSimple>
  )
}

export default CollabDashboard
