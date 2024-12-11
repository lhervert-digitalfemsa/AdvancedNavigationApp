import {SectionList, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Avatar,
  Divider,
  Icon,
  Layout,
  ListItem,
  Text,
} from '@ui-kitten/components';
import useFetch from '../../hooks/useFetch';
import {UserProfile} from '../../types/Profile.type';
import {capitalizeFirstLetter} from '../../utils/stringUtils';
import Loading from '../../components/organisms/Loading';

export function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
  const {data, loading} = useFetch<UserProfile>(
    `https://fakestoreapi.com/users/${1}`,
  );

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
    return () => {
      setProfile(undefined);
    };
  }, [data]);

  const DATA = useMemo(
    () => [
      {
        title: 'Personal Information',
        data: [
          {
            title: 'Legal Name',
            subTitle: `${capitalizeFirstLetter(
              profile?.name?.firstname,
            )} ${capitalizeFirstLetter(profile?.name?.lastname)}`,
          },
          {
            title: 'Address',
            subTitle: `${
              profile?.address?.street
            } ${profile?.address?.number?.toString()} ${
              profile?.address?.city
            } ${profile?.address?.zipcode}`,
            decorationText: 'Edit',
            showChevron: true,
          },
          {
            title: 'Email',
            subTitle: profile?.email,
            decorationText: 'Edit',
            showChevron: true,
          },
          {
            title: 'Phone',
            subTitle: profile?.phone,
            decorationText: 'Edit',
            showChevron: true,
          },
          {
            title: 'Manage account',
            subTitle: 'Manage your account',
            decorationText: 'Edit',
            showChevron: true,
          },
          {
            title: 'Location',
            subTitle: 'Manage location usage',
            showChevron: true,
          },
        ],
      },
      {
        title: 'App Config',
        data: [
          {
            title: 'Language',
            subTitle: 'English',
            showChevron: true,
          },
          {
            title: 'Currency',
            subTitle: 'USD',
            showChevron: true,
          },
          {
            title: 'Notifications',
            subTitle: 'Enabled',
            showChevron: true,
          },
          {
            title: 'Profile privacy',
            subTitle: 'Public',
            showChevron: true,
          },
        ],
      },
    ],
    [profile],
  );
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout level="4" style={styles.mothershipContainer}>
          <Layout level="1" style={styles.subContainer}>
            <Layout>
              <Avatar
                size="giant"
                source={require('../../assets/img/default_profile_image.webp')}
              />
            </Layout>
            <Layout style={styles.userNameContainer}>
              <Text category="h4">
                {`${capitalizeFirstLetter(
                  profile?.name?.firstname,
                )} ${capitalizeFirstLetter(profile?.name?.lastname)}`}
              </Text>
              <Text category="s1">{profile?.email}</Text>
            </Layout>
          </Layout>
          <Layout level="4">
            <SectionList
              sections={DATA}
              keyExtractor={(item, index) => item.title + index}
              stickySectionHeadersEnabled={false}
              renderItem={({item, index}) => (
                <ListItem
                  key={index}
                  title={`${item.title}`}
                  description={`${item.subTitle}`}
                  accessoryRight={
                    item.showChevron ? (
                      <Icon name="arrow-ios-forward" />
                    ) : undefined
                  }
                />
              )}
              ItemSeparatorComponent={Divider}
              renderSectionHeader={({section: {title}}) => (
                <Layout
                  style={{paddingLeft: 10, paddingTop: 10, marginTop: 10}}>
                  <Text category="h6">{title}</Text>
                </Layout>
              )}
            />
          </Layout>
        </Layout>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  mothershipContainer: {flex: 1},
  subContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  userNameContainer: {alignItems: 'center'},
});
