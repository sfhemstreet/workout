import isEqual from "lodash.isequal";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { Layout } from "../components/Layout";
import { SignInModal } from "../components/SignInModal";
import { SwitchWorkoutsAlert } from "../components/SwitchWorkoutsAlert";
import { PAGE_TITLE_MAP } from "../constants";
import {
  changeActiveWorkoutAccept,
  changeActiveWorkoutCancel,
} from "../redux/ducks/activeWorkout";
import { toggleSignInModal } from "../redux/ducks/signInModal";
import {
  switchWorkoutAccept,
  switchWorkoutCancel,
} from "../redux/ducks/switchWorkout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { NavMenuContainer } from "./NavMenuContainer";
import { UserMenuContainer } from "./UserMenuContainer";

/**
 * LayoutContainer
 *
 * Connects to redux store to control the signInModal
 * and determines the pages title and icon.
 *
 * @returns Layout component
 */
export const LayoutContainer: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isSignInModalOpen, isSwitchWorkoutModalOpen, currentWorkoutName } =
    useAppSelector(
      (state) => ({
        isSignInModalOpen: state.signInModal.isOpen,
        isSwitchWorkoutModalOpen: state.activeWorkout.switchWorkout !== null,
        currentWorkoutName: state.activeWorkout.name,
      }),
      isEqual
    );

  const router = useRouter();
  const pageTitle =
    PAGE_TITLE_MAP[router.pathname as keyof typeof PAGE_TITLE_MAP] ??
    PAGE_TITLE_MAP["/"];

  return (
    <>
      <Head>
        <title>
          {pageTitle.text}
        </title>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${pageTitle.icon}</text></svg>`}
        />
      </Head>
      <Layout
        pageTitle={pageTitle.full}
        navMenu={<NavMenuContainer />}
        userMenu={<UserMenuContainer />}
      >
        {children}
      </Layout>
      <SignInModal
        isShowing={isSignInModalOpen}
        toggleIsShowing={() => dispatch(toggleSignInModal())}
      />
      <SwitchWorkoutsAlert
        isShowing={isSwitchWorkoutModalOpen}
        onCancel={() => dispatch(changeActiveWorkoutCancel())}
        onConfirm={() => dispatch(changeActiveWorkoutAccept())}
        workoutName={currentWorkoutName}
      />
    </>
  );
};
