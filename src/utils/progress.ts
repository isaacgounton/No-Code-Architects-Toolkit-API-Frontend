interface JobProgress {
  progress: number;
  preview_url?: string;
  output_url?: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  message?: string;
}

const jobs = new Map<string, JobProgress>();

export const createJob = (jobId: string): JobProgress => {
  const job: JobProgress = {
    progress: 0,
    status: 'queued',
  };
  jobs.set(jobId, job);
  return job;
};

export const updateJobProgress = (
  jobId: string,
  progress: number,
  status: 'queued' | 'processing' | 'completed' | 'failed',
  message?: string
) => {
  const job = jobs.get(jobId);
  if (job) {
    job.progress = progress;
    job.status = status;
    if (message) {
      job.message = message;
    }
  }
};

export const setJobPreview = (jobId: string, previewUrl: string) => {
  const job = jobs.get(jobId);
  if (job) {
    job.preview_url = previewUrl;
  }
};

export const setJobOutput = (jobId: string, outputUrl: string) => {
  const job = jobs.get(jobId);
  if (job) {
    job.output_url = outputUrl;
  }
};

export const getJobProgress = (jobId: string): JobProgress | undefined => {
  return jobs.get(jobId);
};

export const cleanupJob = (jobId: string) => {
  jobs.delete(jobId);
};
