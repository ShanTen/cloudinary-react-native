import { SDKAnalyticsConstants } from '../internal/SDKAnalyticsConstants';
import { Image, Platform } from 'react-native';
import AdvancedImage from '../AdvancedImage';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { render } from '@testing-library/react-native';
import React from 'react';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' });


describe('analytics', () => {
  beforeEach(() => {
    SDKAnalyticsConstants.sdkSemver = '1.0.0';
    SDKAnalyticsConstants.techVersion = '10.2.5';
    SDKAnalyticsConstants.osType = 'A';
    SDKAnalyticsConstants.osVersion = '30';
  });
  it('creates a url with analytics', () => {
    const testImage = new CloudinaryImage('sample', { cloudName: 'demo' });
    const expectedUrl = testImage.toURL({ trackedAnalytics: SDKAnalyticsConstants });

    const { getByTestId } = render(
      <AdvancedImage cldImg={new CloudinaryImage('sample', { cloudName: 'demo' })} testID="cld-image" />
    );

    const imageComponent = getByTestId('cld-image');
    expect(imageComponent.props.source.uri).toBe(expectedUrl);
  });


  it('sets correct osType', () => {
    expect(SDKAnalyticsConstants.osType).toBe('A'); // For Android
  });

  it('sets correct osVersion', () => {
    expect(SDKAnalyticsConstants.osVersion).toBe('30'); // Mocked Android version (API level)
  });
});
