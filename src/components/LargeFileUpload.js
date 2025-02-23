import React from 'react';
import FileUploader from 'devextreme-react/file-uploader';

class LargeFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chunks: [] };
    this.onUploadProgress = this.onUploadProgress.bind(this);
    this.onUploadStarted = this.onUploadStarted.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <FileUploader
          name="file"
          accept="image/*"
          uploadUrl={`${process.env.REACT_APP_API_URL}/user/largeUpload`}
          chunkSize={1000000}
          onUploadStarted={this.onUploadStarted}
          onProgress={this.onUploadProgress}
          multiple
        />
        <span className="note">Allowed file extensions: <span>.jpg, .jpeg, .gif, .png</span>.</span>
        <span className="note">Maximum file size: <span>4 MB.</span></span>
        <div className="chunk-panel">
          {
            this.state.chunks.map((c, i) => <div key={i}>
              <span>Chunk size:</span>
              <span className="segment-size dx-theme-accent-as-text-color">{this.getValueInKb(c.segmentSize)}</span>
              <span>, Uploaded:</span>
              <span className="loaded-size dx-theme-accent-as-text-color">{this.getValueInKb(c.bytesLoaded)}</span>
              <span>/</span>
              <span className="total-size dx-theme-accent-as-text-color">{this.getValueInKb(c.bytesTotal)}</span>
            </div>)
          }
        </div>
      </React.Fragment>
    );
  }

  onUploadProgress(e) {
    const chunk = {
      segmentSize: e.segmentSize,
      bytesLoaded: e.bytesLoaded,
      bytesTotal: e.bytesTotal,
    };
    this.setState({ chunks: [...this.state.chunks, chunk] });
  }

  onUploadStarted() {
    this.setState({ chunks: [] });
  }

  getValueInKb(value) {
    return `${(value / 1024).toFixed(0)}kb`;
  }
}

export default LargeFileUpload;
