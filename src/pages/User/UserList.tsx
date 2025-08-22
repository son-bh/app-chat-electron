import { useCallback, useMemo, useState } from "react";
import isEmpty from "lodash/isEmpty";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Pagination from "@/components/pagination/Pagination";
import { IQueryParams, IUser, PERMISSIONS } from "@/types";
import { useQueryGetTeams, useQueryGetUsers } from "@/services";
import UserTable from "./components/UserTable";
import DeleteAdminModal from "./components/DeleteUserModal";
import UserFormModal from "./components/UserForm/UserForm";
import PageMeta from "@/components/common/PageMeta";
import ResetPasswordModal from "./components/ResetPasswordModal";
import ChangeStatusModal from "./components/ChangeStatusModal";
import Filter from "./components/Filter";
import { mappingOptionSelect } from "@/shared/utils/mapping";
import PermissionModal from "./components/PermissionModal";
import AuthorizationWrapper from "@/components/common/AuthorizationWrapper";

type UserQueryParams = IQueryParams & {
  searchKeyword?: string;
  roles?: string;
  teams?: string;
  status?: string;
  isOfficial?: string;
};

const defaultFilter = { pageIndex: 0, pageSize: 50, isFull: true };
const defaultOpenModal = {
  upsert: false,
  delete: false,
  reset: false,
  changeStatus: false,
  detail: false,
  permission: false,
};

export default function UserList() {
  const [filter, setFilter] = useState<UserQueryParams>(defaultFilter);
  const [userDetail, setUserDetail] = useState<IUser | null>(null);
  const [openModal, setOpenModal] = useState<{
    upsert: boolean;
    delete: boolean;
    reset: boolean;
    changeStatus: boolean;
    detail: boolean;
    permission: boolean;
  }>(defaultOpenModal);

  const { data: userData, refetch } = useQueryGetUsers(filter, {
    refetchInterval: 1 * 60 * 1000,
  });
  const { data: teamData } = useQueryGetTeams();
  const teamOptions = useMemo(
    () => mappingOptionSelect(teamData?.data || []),
    [teamData?.data]
  );

  const handleEditUser = (data: IUser, modalType: string) => {
    setUserDetail(data);
    setOpenModal({ ...defaultOpenModal, [modalType]: true });
  };

  const handleRefetchData = () => {
    refetch();
  };

  const handleCloseModal = () => {
    setOpenModal(defaultOpenModal);
    setUserDetail(null);
  };

  const handleFilterChange = useCallback((newFilter: UserQueryParams) => {
    setFilter(newFilter);
  }, []);

  return (
    <>
      <PageMeta title="Quản lý nhân sự" description="Quản lý nhân sự" />
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <PageBreadcrumb pageTitle="Quản lý nhân sự" />
          <AuthorizationWrapper allowedRoles={PERMISSIONS.CREATE_EMPLOYEE}>
            <Button
              onClick={() => {
                setOpenModal((prev) => ({ ...prev, upsert: true }));
              }}
              className="mb-6"
            >
              Thêm nhân sự
            </Button>
          </AuthorizationWrapper>
        </div>
        <Filter
          teamOptions={teamOptions}
          handleFilterChange={handleFilterChange}
        />
        <div>
          <UserTable
            users={userData?.data || []}
            handleEditUser={handleEditUser}
          />
          <div className="flex justify-end">
            {!isEmpty(userData?.data) && (
              <Pagination
                page={userData?.pagination?.page as number}
                pageLength={userData?.pagination?.pageSize as number}
                totalRecords={userData?.pagination?.count as number}
                onPageChange={(page, pageLength) => {
                  setFilter({
                    ...filter,
                    pageSize: pageLength,
                    pageIndex: page - 1,
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
      <UserFormModal
        isOpen={openModal.upsert}
        userDetail={userDetail}
        teamOptions={teamOptions}
        handleRefetchData={handleRefetchData}
        handleOpenReset={() => {
          setOpenModal((prev) => ({ ...prev, reset: true }));
        }}
        closeModal={handleCloseModal}
      />
      <ChangeStatusModal
        isOpen={openModal.changeStatus}
        userDetail={userDetail}
        handleRefetchData={handleRefetchData}
        closeModal={handleCloseModal}
      />
      <DeleteAdminModal
        isOpen={openModal.delete}
        userDetail={userDetail}
        handleRefetchData={handleRefetchData}
        closeModal={handleCloseModal}
      />
      <ResetPasswordModal
        isOpen={openModal.reset}
        userDetail={userDetail}
        closeModal={() => {
          setOpenModal((prev) => ({ ...prev, reset: false }));
        }}
      />
      {userDetail && (
        <PermissionModal
          isOpen={openModal.permission}
          userDetail={userDetail}
          closeModal={handleCloseModal}
          refetch={refetch}
        />
      )}
    </>
  );
}
